from django.urls import path

from .views import OrderViewSet


app_name = 'simplefood'

urlpatterns = [
    path('', OrderViewSet.as_view({'get': 'list'}), name='order_list'),
    path('<uuid:trip_id>/', OrderViewSet.as_view({'get': 'retrieve'}), name='trip_detail'),
]