from django.core.asgi import get_asgi_application
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter

from simplefood.middleware import TokenAuthMiddlewareStack
from simplefood.simplefoodapp.consumers import SimplefoodConsumer


application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('simplefood/', SimplefoodConsumer.as_asgi()),
        ])
    ),
})