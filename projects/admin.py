from django.contrib import admin
from .models import Project, ProjectGalleryPicture

# Register your models here.

class ProjectGalleryPictureInline(admin.TabularInline):
    model = ProjectGalleryPicture
    exclude = ("compressed_image", )

@admin.register(Project)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [
        ProjectGalleryPictureInline
    ]