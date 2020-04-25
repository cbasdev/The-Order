from django.db import models

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField(null = True)
    image = models.ImageField('Uploaded image', null = True)