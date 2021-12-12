from django.db import models
from users.models import UserProfile
# Create your models here.


class Project(models.Model):
    STATUS_CHOICES = (("0", "In development"), ("1", "Completed"), ("2", "Contest job"))
    preview_pic = models.ImageField(blank=True, upload_to="project_preview_pics")
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    developers = models.ManyToManyField(UserProfile)
    video_id = models.CharField(max_length=255, blank=True)
    github_link = models.CharField(max_length=255, blank=True)
    appstore_link = models.CharField(max_length=255, blank=True)
    playmarket_link = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="0")



    def __str__(self):
        return f'Project {self.title}'


class ProjectGalleryPicture(models.Model):
    image = models.ImageField(upload_to="gallery_images")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_images")