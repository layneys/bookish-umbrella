from django.db import models
from users.models import UserProfile
from PIL import Image
from io import BytesIO
from django.core.files import File
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
    compressed_image = models.ImageField(upload_to="compressed_images", verbose_name = "Облегчённая картинка", default="default.jpg")

    def save(self, *args, **kwargs):
        new_image = self.reduce_image_size(self.image)
        self.compressed_image = new_image
        super().save(*args, **kwargs)


    def reduce_image_size(self, image_to_resize):
        img = Image.open(image_to_resize)
        if img.mode in ("RGBA", "P"): img = img.convert("RGB")
        thumb_io = BytesIO()
        img.resize((500, 500))
        img.save(thumb_io, "jpeg", quality=50)
        new_image = File(thumb_io, name=image_to_resize.name)
        return new_image


    class Meta:
        verbose_name = 'Картинка проекта'
        verbose_name_plural = 'Картинки проекта'

