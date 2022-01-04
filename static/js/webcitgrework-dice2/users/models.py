from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Software(models.Model):
    icon = models.ImageField(upload_to="icons")
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{self.name}'


class Skill(models.Model):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{self.name}'

class UserProfile(models.Model):
    avatar = models.ImageField(
        default="default.jpg",
        upload_to="profile_pics",
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=64, blank=True)
    about = models.TextField(blank=True)
    vk_link = models.CharField(max_length=255, blank=True)
    tg_link = models.CharField(max_length=255, blank=True)
    whatsapp = models.CharField(max_length=255, blank=True)
    software = models.ManyToManyField(Software)
    skills = models.ManyToManyField(Skill)

    def __str__(self):
        return f"User {self.user.first_name} {self.user.last_name}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class UserAchievement(models.Model):
    image = models.ImageField(upload_to="achievements_images")
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_achievements")


class UserGalleryPicture(models.Model):
    image = models.ImageField(upload_to="gallery_images")
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_images")

