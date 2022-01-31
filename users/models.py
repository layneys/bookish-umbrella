from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Software(models.Model):
    icon = models.ImageField(upload_to="icons", verbose_name="Иконка")
    name = models.CharField(max_length=255, blank=True, verbose_name="Программа")

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Программа'
        verbose_name_plural = 'Программы'


class Job(models.Model):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Работа'
        verbose_name_plural = 'Работы'




class Skill(models.Model):
    name = models.CharField(max_length=255, blank=True, verbose_name="Навык")

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'


class UserProfile(models.Model):
    avatar = models.ImageField(
        default="default.jpg",
        upload_to="profile_pics",
    )
    username = models.CharField(max_length=255, blank=True, verbose_name="Username")
    first_name = models.CharField(max_length=255, blank=True, verbose_name="Имя")
    last_name = models.CharField(max_length=255, blank=True, verbose_name="Фамилия")
    email = models.CharField(max_length=255, blank=True, verbose_name="Почта")
    about = models.TextField(blank=True, verbose_name="О себе")
    vk_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на ВКонтакте")
    tg_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на Teleram")
    whatsapp_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на Whatsapp")
    software = models.ManyToManyField(Software, verbose_name="Используемые программы")
    skills = models.ManyToManyField(Skill, verbose_name="Навыки")
    job = models.ManyToManyField(Job, verbose_name="Работа")


    def __str__(self):
        return f" {self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class UserAchievement(models.Model):
    image = models.ImageField(upload_to="achievements_images", verbose_name="Картинка")
    about = models.TextField(blank=True, max_length=255)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_achievements")


class UserGalleryPicture(models.Model):
    image = models.ImageField(upload_to="gallery_images", verbose_name="Картинка")
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_images")


class ArtWork(models.Model):
    preview_pic = models.ImageField(upload_to="artwork_gallery_images", default='')
    about = models.CharField(max_length=255, blank=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    software = models.ManyToManyField(Software, verbose_name="Используемые программы",)


    class Meta:
        verbose_name = 'Художественная работа'
        verbose_name_plural = 'Художественные работы'


class ArtWorkGalleryPicture(models.Model):
    image = models.ImageField(upload_to="artwork_gallery_images")
    art_work = models.ForeignKey(ArtWork, on_delete=models.CASCADE,related_name="artwork_images")

    class Meta:
        verbose_name = 'Картинка художественной работы'
        verbose_name_plural = 'Картинки художественной работы'
