from django.contrib import admin
from . import models


class CustomUserAdmin(admin.ModelAdmin):
    pass


class RestaurantAdmin(admin.ModelAdmin):
    pass


class MenuItemAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    fields = ('id', 'total_price', 'table', 'employee', 'status', 'restaurant', 'payment', 'order_date', 'updated',)
    list_display = ('id', 'total_price', 'table', 'employee', 'status', 'restaurant', 'payment', 'order_date', 'updated',)
    list_filter = ('status',)
    readonly_fields = ('id', 'order_date', 'updated',)


class CustomerDataAdmin(admin.ModelAdmin):
    pass


class OrderDetailAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Restaurant, RestaurantAdmin)
admin.site.register(models.MenuItem, MenuItemAdmin)
admin.site.register(models.CustomUser, CustomUserAdmin)
admin.site.register(models.CustomerData, CustomerDataAdmin)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderDetail, OrderDetailAdmin)
