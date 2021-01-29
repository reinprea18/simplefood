How to setup SimpleFood:

Step 1: create superuser

Step 2: go to backend localhost:8000/admin and create a new Reataurant there called SimpleFood!

Step 3: go to your superuser (in backend) and give him the Restaurant SimpleFood!

*The previous steps are important because if your superuser isn't part of a restaurant, log in won't work, so please follow the previous steps 1 to 3.

*Note: The SimpleFood restaurant is just an imaginary restaurant for the employees of the SimpleFood employees.


The following steps are not mandadory, but they are the common steps in case a customer wants to buy this product:

*Note: Step 4 to Step 6 are done in frontend

Step 4: When logged in with the superuser, create the new restaurant your customer wants to register.

Step 5: When you have done this, create a new user for this restaurant and give him the RestaurantAdmin group.

Step 6: Normally your job as SimpleFood employee is done now (everything else is in the hand of the restaurantadmin), BUT you should 

  also create (with your superuser) a user with group table and group employee for this restaurant so that the groups are created in backend.
  
  *Note: Step 6 must only be done once with the superuser. For all further restaurants the superuser only creates the restaurant and an admin for it.
  

The following steps are again mandadory:

...because otherwise the restaurant admin will can do nothing.

Step 7: Go to the backend localhost:8000/admin again and head to groups.

Step 8: In groups you should now find the groups "restaurantadmin", "table" and "employee" (in case you did Step 4 to Step 6)


Now it comes to the permission concept, so let's have a look at it before we configure the permissions for the different groups

1. In this Web App you can do nothing as unregistered user and only the simplefood admin and the restaurant admin can add users.

2. The lowest group we have is the table, the lowest permissions are therefore "auth group can add group" and "auth group can view group"

3. The second lowest group is the employee, the second lowest permissions are therefore "auth group can change group" and "auth group can delete group"

4. The second highest group is the restaurantadmin, the second highest permissions are therefore "admin log entry can add logentry", "admin log entry can change logentry", 
    "admin log entry can delete logentry" and "admin log entry can view logentry"
    
5. The highest permissions are the simplefood permissions, but while the superuser has per default all permissions, he/she also has these permissions


Step 9: Go to group table and add the following permissions:
    "auth group can add group"
    "auth group can view group"
    
Step 10: Go to group employee and add the following permissions:
    "auth group can add group"
    "auth group can view group"
    "auth group can change group"
    "auth group can delete group"
    
Step 11: Go to group restaurantadmin and add the following permissions:
    "auth group can add group"
    "auth group can view group"
    "auth group can change group"
    "auth group can delete group"
    "admin log entry can add logentry"
    "admin log entry can change logentry" 
    "admin log entry can delete logentry"
    "admin log entry can view logentry"
    
    
Now the permissions are granted to the specific groups. Tables will only be able to view the menu list, while employees will also see the current orders. 

Restaurantadmins will see the same things like tables and employees, but they can also add further menu items, view their users and create new ones.


The setup for SimpleFood is done with this steps. Enjoy SimpleFood as SimpleFood employee, restaurantadmin, restaurant employee or customer.

