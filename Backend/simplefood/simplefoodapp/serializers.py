from rest_framework import serializers
from . import models

class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Restaurant
        fields = [ 'name', 'category', 'description', 'street_address', 'postcode', 'town', 'country' ]

class CustomerDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomerData
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town', 'country', 'restaurant']



class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = [ 'user_name', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town', 'country', 'status', 'role', 'restaurant' ]

class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MenuItem
        fields = [ 'name', 'description', 'category', 'price', 'status', 'restaurant' ]

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Order
        fields = [ 'order_date', 'status', 'customer', 'employee', 'restaurant' ]

class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.OrderDetail
        fields = [ 'amount', 'total_price', 'menu_item', 'order' ]

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Payment
        fields = [ 'paymentDate', 'paymentMethod', 'total_price', 'customer', 'order' ]

#def validate_year_of_birth(self,value):
#       if value <= 1900:
#          raise serializers.ValidationError("Year of birth must be greater than 1900.")
#       return value
# TODO: Following the example of CountrySerializer and PersonSerializer,
# create your own ModelSerializer class here:




