from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length = 200)
    last_name = models.CharField(max_length = 200)
    email = models.CharField(max_length = 50)
    address = models.CharField(max_length = 500)
    phone_number = models.CharField(max_length = 15)
    card_token = models.CharField(max_length = 100)
    customer_token = models.CharField(max_length = 100)

    def __str__(self):
        return self.first_name + ' ' + self.last_name + ' | ' + self.email + ' | ' + self.customer_token

# class Transaction(models.Model):
#     amount = models.CharField(max_length = 20)
#     stripe_token = models.CharField(max_length = 100)
#
#     def __str__(self):
#         return self.stripe_token + ' ' + self.last_name
