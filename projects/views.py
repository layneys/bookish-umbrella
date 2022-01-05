from django.shortcuts import render
from .models import Project, ProjectGalleryPicture
# Create your views here.


def home_page(request):
    projects = Project.objects.filter(status = "1")
    return render(request,
                "../templates/home_page.html",
                  {
                    "projects": projects,

                  },
                )


def project_page(request, id):
    project = Project.objects.get(id=id)
    images = ProjectGalleryPicture.objects.filter(project__id=id)
    devs = project.developers.all()
    return render(request,
                "../templates/projects/project.html",
                  {"project": project,
                   "pictures": images,
                   "devs": devs,
                   },
    )

def project_list(request):
    in_development= Project.objects.filter(status="0")
    completed = Project.objects.filter(status="1")
    contest_projects = Project.objects.filter(status="2")
    return render(request,  "../templates/projects/project_list.html",
                  {"in_development": in_development,
                   "completed_projects": completed,
                   "contest_projects": contest_projects,
                   } )


def header(request):
    return render(request, "../templates/modules/header.html")

def footer_1(request):
    return render(request, "../templates/modules/footer_1.html")

def footer_2(request):
    return render(request, "../templates/modules/footer_2.html")