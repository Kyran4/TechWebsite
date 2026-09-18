from django.urls import include, path
from website import views
from .views import CustomPasswordChangeView
urlpatterns = [
    path('', views.index_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('gallery/', views.gallery_view, name='gallery'),
    path('shop/', views.shop_view, name='shop'),
    path('sale-item/', views.sale_item_view, name='sale_item'),
    path('checkout/', views.checkout_view, name='checkout'),
    path("registration/signup/", views.signup, name="signup"),
    path("accounts/password_change/", CustomPasswordChangeView.as_view(), name="password_change"),
    path("accounts/edit_account/", views.edit_account, name="edit_account"),
    path("accounts/login/", views.login_view, name="login"),
    path("accounts/logout/", views.logout_view, name="logout"),
    path("accounts/", include("django.contrib.auth.urls")),
]