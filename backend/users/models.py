from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length = 200)
    last_name = models.CharField(max_length = 200)
    email = models.CharField(max_length = 50)
    address = models.CharField(max_length = 500)
    phone_number = models.CharField(max_length = 15)
    stripe_token = models.CharField(max_length = 100)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
