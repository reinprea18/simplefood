from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from rest_framework.authtoken.models import Token
from PIL import Image, ImageFont, ImageDraw
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

    @property
    def restaurant(self):
        restaurant = self.restaurant
        return restaurant if restaurant else None

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    photo = models.ImageField(upload_to='photos', blank=True, null=True)
    qr_code = models.ImageField(upload_to='qr_codes', blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.group == 'table' and not self.qr_code:
            qrcode_img = qrcode.make('localhost:4200/qrlogin/:' + self.username + '/:' + self.username)
            canvas = Image.new('RGB', (500, 500), 'white')
            canvas.paste(qrcode_img)
            fname = f'qr_code-{self.username}' + str(self.pk) + '.png'
            buffer = BytesIO()
            canvas.save(buffer, 'PNG')
            self.qr_code.save(fname, File(buffer), save=False)
            canvas.close()
            super().save(*args, **kwargs)
        if not self.photo:
            img = Image.new('RGBA', (900, 900), 'white')
            font = ImageFont.truetype('arial.ttf', 75)
            w, h = font.getsize(self.username)
            draw = ImageDraw.Draw(img)
            draw.text(((900-w)/2, (900-h)/2), self.username, font=font, fill='black')
            buffer = BytesIO()
            img.save(buffer, 'PNG')
            self.photo.save(self.username + str(self.pk) + '.png', File(buffer), save=False)
            super().save(*args, **kwargs)



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

    def __str__(self):
        return "%s" % self.name


class Order(models.Model):

    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    PAY = 'PAY'
    STATUSES = (
        (REQUESTED, REQUESTED),
        (STARTED, STARTED),
        (IN_PROGRESS, IN_PROGRESS),
        (COMPLETED, COMPLETED),
        (PAY, PAY),
    )

    CHOICES = (
        ('m', 'Cash'),
        ('c', 'Card'),
        ('k', 'Klarna'),
        ('o', 'Online Credit Card')
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUSES, default=REQUESTED)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders', null=True)
    payment = models.CharField(max_length=2, choices=CHOICES, default='m', null=True)
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='orders_as_employee'
    )
    table = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='orders_as_table'
    )

    def __str__(self):
        return "%s" % {self.pk}

    def get_absolute_url(self):
        return reverse('order:order_detail', kwargs={'order_id': self.id})


class OrderDetail(models.Model):
    amount = models.PositiveSmallIntegerField()
    menuitem = models.ForeignKey(MenuItem, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, related_name='order_details')
    totalprice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return "%s%s" % (self.menuitem, self.amount)


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

