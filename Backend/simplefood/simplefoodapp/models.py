from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractUser


class Restaurant(models.Model):

    CHOICES = (
        (None, 'Select a Category'),
        ('im', 'Imbiss'),
        ('bu', 'Buffet'),
        ('ba', 'Bar'),
        ('ca', 'Cafe')
    )

    name = models.CharField(max_length=64, blank=False, unique=True, null=False)
    category = models.CharField(max_length=2, choices=CHOICES)
    description = models.TextField(max_length=512, blank=True)
    street_address = models.CharField(max_length=64)
    postcode = models.CharField(max_length=4)
    town = models.CharField(max_length=64)
    country = CountryField()

    def __str__(self):
        return "%s%s" % (self.name, self.category)



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

    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1,choices=CHOICES_GENDER, null=True)
    street_address = models.TextField(null = True)
    postcode = models.CharField(max_length=4, null = True)
    town = models.TextField(null = True)
    country = models.TextField(null = True)
    status = models.BooleanField(default=True)
    role = models.CharField(max_length=1, choices=CHOICES_ROLES)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)




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
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_items', null=True)
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

    CHOICES = (
        ('o', 'ordered'),
        ('p', 'processing'),
        ('s', 'served'),
        ('c', 'completed')

    )

    order_date = models.DateTimeField(auto_now_add=True)
    # table_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=1, choices=CHOICES)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders', null=True)
    payment = models.OneToOneField(Payment, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "%s%s" % (self.restaurant, self.order_date)


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
    country = CountryField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='customer_datas', null=True)

    def __str__(self):
        return "%s%s" % (self.first_name, self.last_name)
