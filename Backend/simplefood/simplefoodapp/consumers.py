from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async

from simplefood.simplefoodapp.models import Order
from simplefood.simplefoodapp.serializers import NestedOrderSerializer, OrderSerializer


class OrderConsumer(AsyncJsonWebsocketConsumer):
    groups = ['test']

    @database_sync_to_async
    def _create_order(self, data):
        serializer = OrderSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.create(serializer.validated_data)


    @database_sync_to_async
    def _get_order_data(self, order):
        return NestedOrderSerializer(order).data

    @database_sync_to_async
    def _get_user_group(self, user):
        return user.groups.first().name

    async def connect(self):
        user = self.scope['user']
        if user.is_anonymous:
            await self.close()
        else:
            user_group = await self._get_user_group(user)
            if user_group == 'employee':
                await self.channel_layer.group_add(
                    group='employee',
                    channel=self.channel_name
                )

            for order_id in await self._get_order_ids(user):
                await self.channel_layer.group_add(
                    group=order_id,
                    channel=self.channel_name
                )

            await self.accept()

    async def create_order(self, message):
        data = message.get('data')
        order = await self._create_order(data)
        order_data = await self._get_order_data(order)

        await self.channel_layer.group_send(group='employee', message={
            'type': 'echo.message',
            'data': order_data
        })

        await self.channel_layer.group_add(
            group=f'{order.id}',
            channel=self.channel_name
        )

        await self.send_json({
            'type': 'echo.message',
            'data': order_data,
        })

    async def disconnect(self, code):
        user = self.scope['user']
        if user.is_anonymous:
            await self.close()
        else:
            user_group = await self._get_user_group(user)
            if user_group == 'employee':
                await self.channel_layer.group_discard(
                    group='employee',
                    channel=self.channel_name
                )

            for order_id in await self._get_order_ids(user):
                await self.channel_layer.group_discard(
                    group=order_id,
                    channel=self.channel_name
                )

        await super().disconnect(code)

    async def receive_json(self, content, **kwargs):
        message_type = content.get('type')
        if message_type == 'create.order':
            await self.create_order(content)
        elif message_type == 'echo.message':
            await self.echo_message(content)

    async def update_order(self, message):
        data = message.get('data')
        order = await self._update_order(data)
        order_id = f'{order.id}'
        order_data = await self._get_order_data(order)

        # Send update to rider.
        await self.channel_layer.group_send(
            group=order_id,
            message={
                'type': 'echo.message',
                'data': order_data,
            }
        )

        await self.channel_layer.group_add(
            group=order_id,
            channel=self.channel_name
        )

        await self.send_json({
            'type': 'echo.message',
            'data': order_data
        })

    @database_sync_to_async
    def _update_order(self, data):
        instance = Order.objects.get(id=data.get('id'))
        serializer = OrderSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.update(instance, serializer.validated_data)

    async def echo_message(self, message):
        await self.send_json(message)

    @database_sync_to_async
    def _get_order_ids(self, user):
        user_groups = user.groups.values_list('name', flat=True)
        if 'driver' in user_groups:
            order_ids = user.orders_as_driver.exclude(
                status=Order.COMPLETED
            ).only('id').values_list('id', flat=True)
        else:
            order_ids = user.orders_as_rider.exclude(
                status=Order.COMPLETED
            ).only('id').values_list('id', flat=True)
        return map(str, order_ids)
