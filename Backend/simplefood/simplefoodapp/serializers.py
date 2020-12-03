from rest_framework import serializers
from . import models

class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Restaurant
        fields = [ 'name', 'category' ]

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Customer
        fields = [ 'user_name', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town', 'country', 'status' ]



class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Employee
        fields = [ 'user_name', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town', 'country', 'position', 'join_date', 'status' ]

class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Menu
        fields = [ 'name', 'description', 'category', 'price', 'status', 'restaurant' ]

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Order
        fields = [ 'orderDate', 'status', 'customer', 'employee', 'restaurant' ]

class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.OrderDetail
        fields = [ 'amount', 'total_price', 'menu', 'order' ]

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Payment
        fields = [ 'paymentDate', 'paymentMethod', 'total_price', 'customer', 'order' ]

class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Feedback
        fields = [ 'rating', 'rating_message', 'restaurant', 'customer' ]

#def validate_year_of_birth(self,value):
#       if value <= 1900:
#          raise serializers.ValidationError("Year of birth must be greater than 1900.")
#       return value
# TODO: Following the example of CountrySerializer and PersonSerializer,
# create your own ModelSerializer class here:




