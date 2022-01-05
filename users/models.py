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


# class Role(models.Model):
#     name = models.CharField(max_length=255, blank=True)
#
#     def __str__(self):
#         return f'{self.name}'




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
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name="Пользователь")
    about = models.TextField(blank=True, verbose_name="О себе")
    vk_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на ВКонтакте")
    tg_link = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на Teleram")
    whatsapp = models.CharField(max_length=255, blank=True, verbose_name="Ссылка на Whatsapp")
    software = models.ManyToManyField(Software, verbose_name="Используемые программы")
    skills = models.ManyToManyField(Skill, verbose_name="Навыки")


    def __str__(self):
        return f" {self.user.first_name} {self.user.last_name}"

    class Meta:
        verbose_name = 'Профиль пользователя'
        verbose_name_plural = 'Профили пользователей'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class UserAchievement(models.Model):
    image = models.ImageField(upload_to="achievements_images", verbose_name="Картинка")
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_achievements")


class UserGalleryPicture(models.Model):
    image = models.ImageField(upload_to="gallery_images", verbose_name="Картинка")
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_images")

