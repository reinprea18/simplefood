from django.contrib.auth import get_user_model
from django.forms import ImageField
from rest_framework import serializers
from django.contrib.auth.models import Group
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models


class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Restaurant
        fields = ['pk', 'name', 'description', 'street_address', 'postcode', 'town', 'country']


class MenuItemSerializer(serializers.ModelSerializer):


    class Meta:
        model = models.MenuItem
        fields = ['pk', 'name', 'description', 'category', 'price', 'restaurant', 'image']



class CustomerDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomerData
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'street_address', 'postcode', 'town',
                  'country', 'order']


class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.OrderDetail
        fields = ['pk', 'amount', 'totalprice', 'menuitem', 'order']


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'password1', 'password2',
                  'first_name', 'last_name', 'group', 'restaurant', 'photo', 'qr_code']
        read_only_fields = ('id',)

    photo = ImageField(allow_empty_file=True, required=False)
    qr_code = ImageField(allow_empty_file=True, required=False)

    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    group = serializers.CharField()

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match.')
        return data

    def create(self, validated_data):
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



class LogInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = CustomUserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Order
        fields = '__all__'
        read_only_fields = ('id', 'order_date', 'updated',)


class NestedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
        depth = 1



