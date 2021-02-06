from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from . import serializers
from . import models
from .serializers import CustomUserSerializer, LogInSerializer


class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer


class LogInView(TokenObtainPairView):
    serializer_class = LogInSerializer
    permission_classes = [AllowAny]


class OrderViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    lookup_url_kwarg = 'order_id'
    serializer_class = serializers.NestedOrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.group == 'employee':
            return models.Order.objects.filter(
                Q(employee=user) | Q(restaurant=user.restaurant)
            )
        if user.group == 'table':
            return models.Order.objects.filter(table=user)
        return models.Order.objects.none()


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = models.Restaurant.objects.all()
    serializer_class = serializers.RestaurantSerializer
    ordering_fields = '__all__'
    ordering = ['name']

    def list(self, request):
        name = request.GET.get("name")
        queryset = self.filter_queryset(self.get_queryset())
        if name is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            try:
                serializer = self.serializer_class(queryset.get(name=name), many=False)
            except models.Restaurant.DoesNotExist:
                serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CustomerDataViewSet(viewsets.ModelViewSet):
    queryset = models.CustomerData.objects.all()
    serializer_class = serializers.CustomerDataSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer

    def list(self, request):
        restaurant = request.GET.get("restaurant")
        queryset = self.filter_queryset(self.get_queryset())
        if restaurant is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(restaurant__pk=restaurant), many=True)
        return Response(serializer.data)


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = models.MenuItem.objects.all()
    serializer_class = serializers.MenuItemSerializer

    def list(self, request):
        restaurant = request.GET.get("restaurant")
        queryset = self.filter_queryset(self.get_queryset())
        if restaurant is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(restaurant__pk=restaurant), many=True)
        return Response(serializer.data)


class OrderDetailViewSet(viewsets.ModelViewSet):
    queryset = models.OrderDetail.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def list(self, request):
        order = request.GET.get("order")
        queryset = self.filter_queryset(self.get_queryset())
        if order is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(order__pk=order), many=True)
        return Response(serializer.data)

