from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
from . import models

class RestaurantViewSet(viewsets.ModelViewSet):

    queryset = models.Restaurant.objects.all()

    serializer_class = serializers.RestaurantSerializer

class CustomerDataViewSet(viewsets.ModelViewSet):

    queryset = models.CustomerData.objects.all()

    serializer_class = serializers.CustomerDataSerializer

class CustomUserViewSet(viewsets.ModelViewSet):

    queryset = models.CustomUser.objects.all()

    serializer_class = serializers.CustomUserSerializer

class MenuItemViewSet(viewsets.ModelViewSet):

    queryset = models.MenuItem.objects.all()

    serializer_class = serializers.MenuItemSerializer

class OrderViewSet(viewsets.ModelViewSet):

    queryset = models.Order.objects.all()

    serializer_class = serializers.OrderSerializer

class OrderDetailViewSet(viewsets.ModelViewSet):

    queryset = models.OrderDetail.objects.all()

    serializer_class = serializers.OrderDetailSerializer

class PaymentViewSet(viewsets.ModelViewSet):

    queryset = models.Payment.objects.all()

    serializer_class = serializers.PaymentSerializer


#class MovieViewSet(viewsets.ModelViewSet):
#
#   queryset = models.Movie.objects.all()
#
#   serializer_class = serializers.MovieSerializer
#
#   def list(self, request):
#      title = request.GET.get("title")
#     country = request.GET.get("country")
#    if title is None and country is None:
#       serializer = self.serializer_class(self.queryset,many=True)
#  elif title is not None:
#     serializer = self.serializer_class(self.queryset.filter(title=title),many=True)
#else:
#   serializer = self.serializer_class(self.queryset.filter(country__name=country, many=True))
#return Response(serializer.data)
