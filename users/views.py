from django.shortcuts import render
from users.models import User, UserGalleryPicture, UserAchievement, Software, Skill
from projects.models import Project


def profile_page(request, username):
    user = User.objects.get(username=username)
    images = UserGalleryPicture.objects.filter(user__user__username=username)
    achievements = UserAchievement.objects.filter(user__user__username=username)
    projects = Project.objects.filter(developers__user__username=username)
    skills = Skill.objects.filter(userprofile__user__username=username)
    software = Software.objects.filter(userprofile__user__username=username)
    return render(request,
                "../templates/users/user_profile.html",
                  {"user": user,
                   "skills": skills,
                   "soft": software,
                   "pictures": images,
                   "projects": projects,
                   "achievements": achievements,
                   "software": software,
                   },
    )