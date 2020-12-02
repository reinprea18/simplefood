from django.db import models


class Restaurant(models.Model):

    CHOICES = (
        ('im' , 'Imbiss'),
        ('bu' , 'Buffet'),
        ('ba' , 'bar')
    )

    name = models.TextField()
    category = models.CharField(max_length=2,choices=CHOICES)
    description = models.TextField()
    street_address = models.TextField()
    postcode = models.PositiveIntegerField()
    town = models.TextField()
    country = models.TextField()

    def __str__(self):
        return self.name

class Customer(models.Model):

    CHOICES = (
        ('m' , 'male'),
        ('f' , 'female'),
        ('*' , 'unknown')
    )

    user_name = models.TextField()
    email = models.TextField()
    password = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1,choices=CHOICES)
    street_address = models.TextField()
    postcode = models.PositiveIntegerField()
    town = models.TextField()
    country = models.TextField()
    status = models.BooleanField()

    def __str__(self):
        return "%s%s" % ( self.first_name , self.last_name)

class Employee(models.Model):

    CHOICES = (
        ('m' , 'male'),
        ('f' , 'female'),
        ('*' , 'unknown')
    )

    user_name = models.TextField()
    email = models.TextField()
    password = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1,choices=CHOICES)
    street_address = models.TextField()
    postcode = models.PositiveIntegerField()
    town = models.TextField()
    country = models.TextField()
    position = models.TextField()
    joinDate = models.DateField()
    status = models.BooleanField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return "%s%s" % ( self.first_name , self.last_name)


class Menu(models.Model):

    CHOICES = (
        ('f' , 'Food'),
        ('d' , 'Drink')
    )

    name = models.TextField()
    description = models.TextField()
    category = models.CharField(max_length=1,choices=CHOICES)
    price = models.PositiveIntegerField()
    status = models.BooleanField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Order(models.Model):
    orderDate = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)



class OrderDetail(models.Model):
    amount = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

class Payment(models.Model):

    CHOICES = (
        ('m' , 'cash'),
        ('c' , 'card'),
        ('k' , 'klarna')
    )

    payment_date = models.DateTimeField()
    paymentMethod = models.CharField(max_length=2,choices=CHOICES)
    total_price = models.PositiveIntegerField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

class Feedback(models.Model):
    rating = models.PositiveIntegerField()
    rating_message = models.TextField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)


    def __str__(self):
        return self.rating




