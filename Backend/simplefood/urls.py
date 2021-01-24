"""simplefood URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings # new
from django.conf.urls.static import static # new
from django.conf.urls import url
from django.contrib import admin
from pathlib import Path
from django.contrib.auth.views import LoginView
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token


from django.conf import settings
from django.views.static import serve

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_simplejwt.views import TokenRefreshView

from .simplefoodapp import views
from .simplefoodapp.views import SignUpView

from rest_framework_simplejwt.views import TokenRefreshView # new

from simplefood.simplefoodapp.views import SignUpView, LogInView # changed

router = routers.DefaultRouter()
router.register(r'restaurants', views.RestaurantViewSet)
router.register(r'menuitems', views.MenuItemViewSet)
# router.register(r'users', views.CustomUserViewSet)
# router.register(r'orders', views.OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('auth/', obtain_auth_token),
    path('sign_up/', SignUpView.as_view(), name='sign_up'),
    path('log_in/', LogInView.as_view(), name='log_in'),
    path('order/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root= Path.joinpath(settings.MEDIA_ROOT, 'qr_codes'))
