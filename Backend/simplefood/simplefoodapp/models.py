from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


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


class MyCustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):

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

    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.TextField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    password = models.TextField()
    first_name = models.TextField(null = True)
    last_name = models.TextField(null = True)
    date_of_birth = models.DateField(null = True, blank=True, default=False)
    gender = models.CharField(max_length=1,choices=CHOICES_GENDER, null = True)
    street_address = models.TextField(null = True)
    postcode = models.CharField(max_length=4, null = True)
    town = models.TextField(null = True)
    country = models.TextField(null = True)
    status = models.BooleanField(default=True)
    role = models.CharField(max_length=1, choices=CHOICES_ROLES)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyCustomUserManager()

    def __str__(self):
        return "%s%s" % (self.first_name, self.last_name)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


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
