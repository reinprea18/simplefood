from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
from . import models
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class RestaurantViewSet(viewsets.ModelViewSet):

    queryset = models.Restaurant.objects.all()
    serializer_class = serializers.RestaurantSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

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
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


##class CustomUserViewSet(viewsets.ModelViewSet):
##
##    queryset = models.CustomUser.objects.all()
##    serializer_class = serializers.CustomUserSerializer
##    authentication_classes = (TokenAuthentication,)


class MenuItemViewSet(viewsets.ModelViewSet):

    queryset = models.MenuItem.objects.all()
    serializer_class = serializers.MenuItemSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def list(self, request):
        restaurant = request.GET.get("restaurant")
        queryset = self.filter_queryset(self.get_queryset())
        if restaurant is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(restaurant__name=restaurant), many=True)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):

    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    # authentication_classes = (TokenAuthentication,)


class OrderDetailViewSet(viewsets.ModelViewSet):

    queryset = models.OrderDetail.objects.all()
    serializer_class = serializers.OrderDetailSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


class PaymentViewSet(viewsets.ModelViewSet):

    queryset = models.Payment.objects.all()
    serializer_class = serializers.PaymentSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


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
