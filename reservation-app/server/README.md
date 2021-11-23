Hello! We have learned that when creating a new user in MySQL Workbench, you must remember to give that user access to do anything in the schema for it to work.

To do this, login as the root user (the one with total access) and go to the database in MySQL Workbench.

Click "Users and Privileges" on the left.

Create a new user with username = "admin" and password = "password".

Give that user the DBA role in the Administrative Roles tab.

You can then connect to the database using the code in app.js.