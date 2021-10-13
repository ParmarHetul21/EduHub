from django.urls import path
from .views import current_user, UserList,SubjectList

urlpatterns = [
    path('current_user/', current_user, name="currentUser"),
    path('users/', UserList.as_view()),
    path("addsubject/", SubjectList.Addsubjects, name="addSubject"),
    path("showsubject/", SubjectList.showSubjects, name="showSubject"),
]