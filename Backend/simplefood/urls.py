from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView
from .simplefoodapp import views
from simplefood.simplefoodapp.views import SignUpView, LogInView

router = routers.DefaultRouter()
router.register(r'restaurants', views.RestaurantViewSet)
router.register(r'menuitems', views.MenuItemViewSet)
router.register(r'users', views.CustomUserViewSet)
router.register(r'orderdetails', views.OrderDetailViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sign_up/', SignUpView.as_view(), name='sign_up'),
    path('log_in/', LogInView.as_view(), name='log_in'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('order/', include('simplefood.simplefoodapp.urls', 'order',)),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)