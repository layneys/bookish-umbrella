from django.db import models
from users.models import UserProfile
# Create your models here.


class Project(models.Model):
    STATUS_CHOICES = (("0", "В разработке"), ("1", "Завершён"), ("2", "Конкурсная работа"))
    preview_pic = models.ImageField(blank=True, upload_to="project_preview_pics", verbose_name="Аватар проекта")
    title = models.CharField(max_length=255, verbose_name="Название проекта")
    description = models.CharField(max_length=255, verbose_name="Описание проекта")
    developers = models.ManyToManyField(UserProfile, verbose_name="Разработчики")
    video_id = models.CharField(max_length=255, blank=True, verbose_name="id видео")
    github_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на github")
    appstore_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на appstore")
    playmarket_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на playmarket")
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="0", verbose_name="Состояние проекта")


    def __str__(self):
        return f' {self.title}'


    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class ProjectGalleryPicture(models.Model):
    image = models.ImageField(upload_to="gallery_images", verbose_name="Картинка")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_images", verbose_name="Проект")


    class Meta:
        verbose_name = 'Картинка проекта'
        verbose_name_plural = 'Картинки проекта'

