from django.contrib import admin
from users.models import UserProfile, UserGalleryPicture, UserAchievement, Software, Skill, Job, ArtWork, ArtWorkGalleryPicture
from nested_inline.admin import NestedTabularInline, NestedModelAdmin

class UserGalleryPictureInline(NestedTabularInline):
    model = UserGalleryPicture


class UserAchievementInline(NestedTabularInline):
    model = UserAchievement


class ArtWorkPictureInline(NestedTabularInline):
    model = ArtWorkGalleryPicture
    extra = 1


class ArtWorkInline(NestedTabularInline):
    model = ArtWork
    inlines = [ArtWorkPictureInline,
               ]
    extra = 1


@admin.register(UserProfile)
class UserProfileAdmin(NestedModelAdmin):
    inlines = [
        UserGalleryPictureInline,
        UserAchievementInline,
        ArtWorkInline,
    ]


admin.site.register(Skill)
# admin.site.register(Role)
admin.site.register(Software)
admin.site.register(Job)
