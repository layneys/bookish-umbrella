from django.contrib import admin
from .models import Project, ProjectGalleryPicture

# Register your models here.

class ProjectGalleryPictureInline(admin.TabularInline):
    model = ProjectGalleryPicture

@admin.register(Project)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [
        ProjectGalleryPictureInline
    ]