from rest_framework import viewsets
from .models import Product
from .serializer import ProductSerializer

# Desde aqui se puede crear un crud 

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer