from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from . import models


class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MenuItem
        fields = ['pk', 'name', 'description', 'category', 'price', 'status_available', 'restaurant', 'alcoholic']


class CustomerDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomerData
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town',
                  'country', 'order']


class OrderDetailSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):

    class Meta:
        model = models.OrderDetail
        fields = ['amount', 'total_price', 'menu_item', 'order']


class OrderSerializer(serializers.ModelSerializer):

    # order_details = OrderDetailSerializer(many=True, queryset=models.OrderDetail.objects.all())
    # customer_datas = CustomerDataSerializer(many=True, queryset=models.CustomerData.objects.all())

    class Meta:
        model = models.Order
        fields = ['order_date', 'total_price', 'status', 'order_details', 'restaurant', 'payment',
                  'customer_datas']


class RestaurantSerializer(serializers.ModelSerializer):

    # orders = OrderSerializer(many=True, queryset=models.Order.objects.all())
    # menu_items = MenuItemSerializer(many=True, queryset=models.MenuItem.objects.all())

    class Meta:
        model = models.Restaurant
        fields = ['pk', 'name', 'description', 'street_address', 'postcode', 'town', 'country']


class PaymentSerializer(serializers.ModelSerializer):

    # order = OrderSerializer(many=False, queryset=models.Order.objects.all())

    class Meta:
        model = models.Payment
        fields = ['paymentDate', 'paymentMethod', 'order']


# class CustomUserSerializer(serializers.ModelSerializer):
#
#    class Meta:
#        model = models.CustomUser
#        fields = ['user_name', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address',
#                  'postcode', 'town', 'country', 'status', 'role', 'restaurant']



#def validate_year_of_birth(self,value):
#       if value <= 1900:
#          raise serializers.ValidationError("Year of birth must be greater than 1900.")
#       return value
# TODO: Following the example of CountrySerializer and PersonSerializer,
# create your own ModelSerializer class here:




