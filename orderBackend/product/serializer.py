from rest_framework import serializers
from .models import Product

#Serializer permite transportar objetos a traves de la web

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'