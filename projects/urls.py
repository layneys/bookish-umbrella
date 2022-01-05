from django.urls import path
from .views import *

app_name = "projects"

urlpatterns = [
    path("project/<int:id>/", project_page),
    path("projects/", project_list),
    path("", home_page),
    path("templates/modules/header.html", header),
    path("templates/modules/footer_1.html", footer_1),
    path("templates/modules/footer_2.html", footer_2),
]