# movieTic Challenge



##Setup instructions

After downloading the project, go to its root folder.

###Backend

To set the **backend** server up:

```
$ cd backend
$ python manage.py runserver
```

This will start the server. If you go to `http://localhost:8000/admin/`, you will be able to access the Django admin site. The **username** is **tony**, and the **password** is **dummyDjangoPassword**.

I also set up a Stripe account. The username is **tonyram20@gmail.com** and the password is **stripeDummyPassword**.

###Frontend

In another terminal, go to the **frontend** directory:

```
$ cd frontend
$ npm install
$ node index.js
```

This will install all the dependencies needed, and will also start the local server at `http://localhost:3000/`. Go to that address and you will be able to use the app.

To test the app, you can use this dummy credit card information provided by Stripe:


Card number: 4242424242424242
Expiration month: 12
Expiration year: 2017
CVC: 123

#####Quick side note
The passwords for the Stripe account and Django admin interface are also in the dummypasswords.txt file.
