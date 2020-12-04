from django.contrib import admin
from . import models

'''
TODO: Implement movie, person and country model admins
Use list_display, search_fields and filters to accomplish following things:

(a) Person should include all fields defined (including the "gender" field you have added through a migration)
(b) Country should display name in the change list. It should be possible to search for the country name.
(c) Movie should display title, genre and release_date in the change list. It should also be possible to filter movies by country
(d) When viewing the Movie form you will notice, that "country" and "actors" fields read 
    "Country object (1)" and "Person object (1)" respectively: go back to models.py and implement the __str__ 
    methods and return something human readable there. 
'''

class RestaurantAdmin(admin.ModelAdmin):

    list_display = ( 'name' , 'category')
    search_fields = ( 'name', )
    list_filter = ('category',)

class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(models.Restaurant, RestaurantAdmin)
admin.site.register(models.MenuItem, MenuItemAdmin)
