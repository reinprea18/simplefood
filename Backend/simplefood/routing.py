from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter

from django.urls import path

from simplefood.middleware import TokenAuthMiddlewareStack

from simplefood.simplefoodapp.consumers import OrderConsumer

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('simplefood/', OrderConsumer.as_asgi()),
        ])
    ),
})