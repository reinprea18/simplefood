from django.db import models
from django.contrib.auth.models import AbstractUser


class Restaurant(models.Model):

    CHOICES = (
        ('im' , 'Imbiss'),
        ('bu' , 'Buffet'),
        ('ba' , 'bar')
    )

    name = models.TextField(max_length=50)
    category = models.CharField(max_length=2,choices=CHOICES)
    description = models.TextField(max_length=500, null=True)
    street_address = models.TextField()
    postcode = models.PositiveIntegerField()
    town = models.TextField()
    country = models.TextField()

    def __str__(self):
        return self.name


class CustomUser(models.Model):

    CHOICES = (
        ('m' , 'male'),
        ('f' , 'female'),
        ('*' , 'unknown')
    )

    CHOICES_ROLES = (
        ('m' , 'masteradmin'),
        ('r' , 'restaurantadmin'),
        ('e' , 'employee'),
        ('t' , 'table')
    )

    user_name = models.TextField()
    password = models.TextField()
    email = models.TextField(null = True)
    first_name = models.TextField(null = True)
    last_name = models.TextField(null = True)
    date_of_birth = models.DateField(null = True)
    gender = models.CharField(max_length=1,choices=CHOICES, null = True)
    street_address = models.TextField(null = True)
    postcode = models.PositiveIntegerField(null = True)
    town = models.TextField(null = True)
    country = models.TextField(null = True)
    status = models.BooleanField()
    role = models.CharField(max_length=1, choices=CHOICES_ROLES)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "%s%s" % ( self.first_name , self.last_name)

class Order(models.Model):
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()
    table_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    paid = models.BooleanField(default=False)

class CustomerData(models.Model):

    CHOICES = (
        ('m' , 'male'),
        ('f' , 'female'),
        ('*' , 'unknown')
    )

    ##user_name = models.TextField()
    email = models.TextField()
    ##password = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1,choices=CHOICES)
    street_address = models.TextField()
    postcode = models.PositiveIntegerField()
    town = models.TextField()
    country = models.TextField()
    restaurant = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "%s%s" % ( self.first_name , self.last_name)


class MenuItem(models.Model):

    CHOICES = (
        ('f' , 'Food'),
        ('d' , 'Drink')
    )

    name = models.TextField()
    description = models.TextField(max_length=500)
    category = models.CharField(max_length=1,choices=CHOICES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.BooleanField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class OrderDetail(models.Model):
    amount = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=6, decimal_places=2)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)


class Payment(models.Model):

    CHOICES = (
        ('m' , 'cash'),
        ('c' , 'card'),
        ('k' , 'klarna')
    )

    payment_date = models.DateTimeField()
    paymentMethod = models.CharField(max_length=2,choices=CHOICES)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)




