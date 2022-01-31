from django.shortcuts import render
from users.models import User, UserGalleryPicture, UserAchievement, Software, Skill, UserProfile, Job, ArtWork
from projects.models import Project


def profile_page(request, username):
    user = UserProfile.objects.get(username=username)
    images = UserGalleryPicture.objects.filter(user__username=username)
    achievements = UserAchievement.objects.filter(user__username=username)
    projects = Project.objects.filter(developers__username=username)
    skills = Skill.objects.filter(userprofile__username=username)
    software = Software.objects.filter(userprofile__username=username)
    jobs = Job.objects.filter(userprofile__username=username)
    art_works = ArtWork.objects.filter(user__username=username)
    return render(request,
                "../templates/users/user_profile.html",
                  {"user": user,
                   "skills": skills,
                   "soft": software,
                   "pictures": images,
                   "projects": projects,
                   "achievements": achievements,
                   "software": software,
                   "jobs": jobs,
                   "artworks":art_works,
                   },
    )


def team_page(request):
    users = UserProfile.objects.all()
    return render(request,
                  "../templates/users/about-team.html",
                  {"users": users,
                   },
                  )
