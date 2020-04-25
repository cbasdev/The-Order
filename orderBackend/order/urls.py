from rest_framework import routers

from .viewsets import OrderViewSet

router = routers.SimpleRouter()
router.register('order', OrderViewSet)

urlpatterns = router.urls