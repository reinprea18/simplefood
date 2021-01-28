from django.contrib.auth import login
from django.db.models import Q
from django.shortcuts import redirect
from rest_framework import viewsets, status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import serializers
from . import models
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissions

from .models import Order
from .serializers import CustomUserSerializer


class SignUpView(generics.CreateAPIView):

    queryset = models.CustomUser.objects.all()
    serializer_class = CustomUserSerializer

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


class CustomTableViewSet(viewsets.ModelViewSet):

    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer


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


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'id'
    lookup_url_kwarg = 'order_id'
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.group == 'customer':
            return Order.objects.filter(
                Q(status=Order.REQUESTED) | Q(table=user)
            )
        if user.group == 'employee':
            return Order.objects.filter(employee=user)
        return Order.objects.none()


class OrderDetailViewSet(viewsets.ModelViewSet):

    queryset = models.OrderDetail.objects.all()
    serializer_class = serializers.OrderDetailSerializer


class PaymentViewSet(viewsets.ModelViewSet):

    queryset = models.Payment.objects.all()
    serializer_class = serializers.PaymentSerializer


#@api_view(['GET', 'POST'])
#def auth_user(request, *args, **kwargs):
 #   try:
  #      token = request.GET.get('token')
 #   except models.CustomUser.DoesNotExist:
  #      token = None
 #   try:
 #       user = models.CustomUser.objects.get(auth_token=token)
 #   except models.CustomUser.DoesNotExist:
 #       user = None
 #   if token is not None:
 #       if user is not None:
  #          if user.role == 't':
  #              user.backend = 'django.contrib.auth.backends.ModelBackend'
  #              login(request, user)
  #              return redirect('http://127.0.0.1:8000/')
  #          else:
  #              response = {'message': 'Your token is not a table token'}
   #             return Response(response, status=status.HTTP_400_BAD_REQUEST)
   #     else:
  #          response = {'message': 'No user with this token found'}
  #          return Response(response, status=status.HTTP_400_BAD_REQUEST)
 #   else:
 #       response = {'message': 'You need to provide a token'}
  #      return Response(response, status=status.HTTP_400_BAD_REQUEST)


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
