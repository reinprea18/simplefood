# SimpleFood

SimpleFood is a contactless in-house ordering system for restaurants!

## Installation

Set up your your project and install the requirements.txt in the Backend folder.

If you have problems with installing the requirements:

- run: python -m pip install --upgrade pip
- Download Twisted from https://www.lfd.uci.edu/~gohlke/pythonlibs/#twisted for your local installed python version.
- Next place the file in the Backend folder of the project and activate the virtual environment.
- run : pip install "file_name"

After that steps everything should work fine.

## User Roles

In the database which is included in the project, some users are already created.
You can also find some menu items in the database.

### ADMIN

The admin can create and delete restaurants in this application. He can also and delete new users with the role "restaurantadmin" or "employee".

- username: admin
- password: admin

### RESTAURANTADMIN

The restaurantadmin can create and delete new users, with the roles "restaurantadmin", and "employee". He can also add new menu items, edit and delete them. Another function of the restaurant admin is to create and delete tables that are available in the restaurant.

There are already two restaurantadmins created for two different restaurants.

- usernames: mc_döner_radmin, mc_burger_radmin
- password: 1234

### Employee

Employees are able to take orders and process them.

There are already two employees created for two different restaurants.

- usernames: mc_döner_employee, mc_burger_employee
- password: 1234

### Tables

Tables can log in using QR code, but since we have no connection to the server with the smartphone you can either log in or scan the QR code and enter it in the browser of the PC.

Tables are able to place new orders, view them and pay for them at the end by pressing the "Call employee to pay" button.

There are already 4 tables created for two different restaurants.

- username: mc_döner_table_1, mc_döner_table_2, mc_burger_table_1, mc_burger_table_2
- password: same as username

## Web Socket

There is a Web Socket connection between the table and the employee order page, so employees and tables get live updates for their orders.

