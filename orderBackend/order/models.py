from django.db import models

from product.models import Product
# Create your models here.


class Order(models.Model):
    name_order = models.TextField()
    total_price = models.IntegerField()
    observations = models.TextField()
    status_place = models.IntegerField()
    state = models.IntegerField()
    products = models.ManyToManyField(Product)