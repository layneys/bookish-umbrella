from django.contrib import admin
from users.models import UserProfile, UserGalleryPicture, UserAchievement, Software, Skill, Job


class UserGalleryPictureInline(admin.TabularInline):
    model = UserGalleryPicture


class UserAchievementInline(admin.TabularInline):
    model = UserAchievement


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [
        UserGalleryPictureInline,
        UserAchievementInline,
    ]


admin.site.register(Skill)
# admin.site.register(Role)
admin.site.register(Software)
admin.site.register(Job)