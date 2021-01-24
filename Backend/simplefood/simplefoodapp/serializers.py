from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group
from . import models


class RestaurantSerializer(serializers.ModelSerializer):

    # orders = OrderSerializer(many=True, queryset=models.Order.objects.all())
    # menu_items = MenuItemSerializer(many=True, queryset=models.MenuItem.objects.all())

    class Meta:
        model = models.Restaurant
        fields = ['name', 'description', 'street_address', 'postcode', 'town', 'country']


class MenuItemSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer(many=False)

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
        fields = ['__all__']
        read_only_fields = ('id', 'order_date', 'updated')


class NestedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
        depth = 1


class PaymentSerializer(serializers.ModelSerializer):

    # order = OrderSerializer(many=False, queryset=models.Order.objects.all())

    class Meta:
        model = models.Payment
        fields = ['paymentDate', 'paymentMethod', 'order']


class AuthSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Auth
        fields = ['token']


class CustomUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    group = serializers.CharField()


    class Meta:
        model = models.CustomUser
        fields = ['id', 'username', 'password1', 'password2',
                  'first_name', 'last_name', 'role', 'restaurant', 'group', 'photo']
        read_only_fields = ('id',)
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match.')
        return data

    def create(self, validated_data): # changed
        group_data = validated_data.pop('group')
        group, _ = Group.objects.get_or_create(name=group_data)
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']
        user = self.Meta.model.objects.create_user(**data)
        user.groups.add(group)
        user.save()
        return user


class CustomTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = ['username', 'password', 'is_active', 'role', 'restaurant', 'qr_code']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(**validated_data)
        return user


class LogInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = CustomUserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token

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




