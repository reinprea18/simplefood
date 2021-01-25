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

    CHOICES_GENDER = (
        ('m', 'male'),
        ('f', 'female'),
        ('*', 'other')
    )

    CHOICES_ROLES = (
        ('m', 'masteradmin'),
        ('r', 'restaurantadmin'),
        ('e', 'employee'),
        ('t', 'table')
    )
    postcode = models.CharField(max_length=4, null=True, blank=True)
    town = models.TextField(null=True, blank=True)
    country = models.TextField(null=True, blank=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    role = models.CharField(max_length=1, choices=CHOICES_ROLES)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        token = Token.objects.get_or_create(user=self)
        if self.role == 't':
            qrcode_img = qrcode.make('http://127.0.0.1:8000/auth_user/user_auth/?token=' + token[0].key)
            canvas = Image.new('RGB', (500, 500), 'white')
            canvas.paste(qrcode_img)
            fname = f'qr_code-{self.username}'+'.png'
            buffer = BytesIO()
            canvas.save(buffer,'PNG')
            self.qr_code.save(fname, File(buffer), save=False)
            canvas.close()
            super().save(*args, **kwargs)

    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None


class UserPermissions(models.Model):

    CHOICES_ROLES = (
        ('r', 'restaurantadmin'),
        ('e', 'employee'),
        ('t', 'table')
    )

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    permission = models.CharField(max_length=1, choices=CHOICES_ROLES)


class MenuItem(models.Model):

    CHOICES = [
        ('Food', (
            ('a', 'Appetizers'),
            ('m', 'Main Courses'),
            ('d', 'Desserts')
        )
         ),
        ('Drinks', (
            ('b', 'Beer'),
            ('w', 'Wine'),
            ('s', 'Soft Drinks'),
            ('c', 'Cocktails'),
        )
         ),
    ]

    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.CharField(max_length=1, choices=CHOICES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    status_available = models.BooleanField(default=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurant', null=True)
    alcoholic = models.BooleanField(default=False)
    # menu_item_image = models.ImageField(upload_to='menu_images_/' + str(restaurant.name), blank=True, null=True)

    def __str__(self):
        return "%s%s%s" % (self.name, self.category, self.price)


class Payment(models.Model):

    CHOICES = (
        ('m', 'Cash'),
        ('c', 'Card'),
        ('k', 'Klarna'),
        ('o', 'Online Credit Card')
    )

    payment_date = models.DateTimeField()
    paymentMethod = models.CharField(max_length=2, choices=CHOICES)

    def __str__(self):
        return "%s%s" % (self.order, self.paymentMethod)


class Order(models.Model):

    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    STATUSES = (
        (REQUESTED, REQUESTED),
        (STARTED, STARTED),
        (IN_PROGRESS, IN_PROGRESS),
        (COMPLETED, COMPLETED),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUSES, default=REQUESTED)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders', null=True)
    payment = models.OneToOneField(Payment, blank=True, null=True, on_delete=models.CASCADE)
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_driver'
    )
    customer = models.ForeignKey( # new
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_rider'
    )

    def __str__(self):
        return f'{self.id}'

    def get_absolute_url(self):
        return reverse('trip:trip_detail', kwargs={'trip_id': self.id})


class OrderDetail(models.Model):
    amount = models.PositiveSmallIntegerField()
    menu_item = models.OneToOneField(MenuItem, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, related_name='order_details')
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return "%s%s" % (self.menu_item, self.amount)


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
