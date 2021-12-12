from django.urls import path
from .views import *

app_name = "projects"

urlpatterns = [
    path("project/<int:id>/", project_page),
    path("projects/", project_list),
    path("", home_page),
]