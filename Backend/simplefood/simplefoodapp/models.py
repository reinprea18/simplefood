from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractUser
from rest_framework.authtoken.models import Token
from PIL import Image, ImageDraw, ImageFont
import qrcode
from io import BytesIO
from django.core.files import File
import uuid
from django.shortcuts import reverse
from django.conf import settings


class Restaurant(models.Model):

    name = models.CharField(max_length=64, blank=False, unique=True, null=False)
    description = models.TextField(max_length=512, blank=True)
    street_address = models.CharField(max_length=64, null=True, blank=True)
    postcode = models.CharField(max_length=4, null=True, blank=True)
    town = models.CharField(max_length=64, null=True, blank=True)
    country = models.CharField(null=False, blank=False, max_length=64, default="Austria")

    def __str__(self):
        return "%s" % self.name


class CustomUser(AbstractUser):
    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None

    CHOICES_GENDER = (
        ('m', 'male'),
        ('f', 'female'),
        ('*', 'other')
    )

    postcode = models.CharField(max_length=4, null=True, blank=True)
    town = models.TextField(null=True, blank=True)
    country = models.TextField(null=True, blank=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    qr_code = models.ImageField(upload_to='qr_codes', blank=True)
    def get_restaurant(self):
        return self.restaurant.id

    def get_group(self):
        return self.group


class MenuItem(models.Model):

    CHOICES = (
        ('f', 'food'),
        ('d', 'drink')
    )

    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.CharField(max_length=1, choices=CHOICES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurant', null=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    # image = models.ImageField(upload_to='menu_images_/' + str(restaurant.name), blank=True, null=True)

    def __str__(self):
        return "%s" % self.name


class Order(models.Model):

    STATUSES = (
        ('r', 'REQUESTED'),
        ('s', 'STARTED'),
        ('d', 'DELIVERED'),
        ('c', 'COMPLETED')
    )

    CHOICES = (
        ('m', 'Cash'),
        ('c', 'Card'),
        ('k', 'Klarna'),
        ('o', 'Online Credit Card')
    )

    order_date = models.CharField(max_length=1, null=True)
    updated = models.CharField(max_length=1, null=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUSES, default='r', null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders', null=True)
    payment = models.CharField(max_length=2, choices=CHOICES, default='m', null=True)
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='order_as_employee'
    )
    table = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='order_as_table'
    )

    def __str__(self):
        return "%s" % {self.pk}


class OrderDetail(models.Model):
    amount = models.PositiveSmallIntegerField()
    menuitem = models.ForeignKey(MenuItem, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, related_name='order_details')
    totalprice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return "%s%s" % (self.menu_item, self.amount)

class Bestellung(models.Model):
    name = models.CharField(max_length=10)


class CustomerData(models.Model):

    CHOICES = (
        ('m', 'male'),
        ('f', 'female'),
        ('*', 'unknown')
    )

    email = models.EmailField()
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=CHOICES)
    street_address = models.CharField(max_length=64)
    postcode = models.CharField(max_length=4)
    town = models.CharField(max_length=64)
    country = models.CharField(null=False, blank=False, max_length=64, default="Austria")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='customer_datas', null=True)

    def __str__(self):
        return "%s%s" % (self.first_name, self.last_name)


class Auth(models.Model):
    token = None
