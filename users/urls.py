from django.urls import path
from users import views as user_views

app_name = "users"

urlpatterns = [
    path("profile/<str:username>/", user_views.profile_page),
]