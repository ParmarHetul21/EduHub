from django.urls import path
from .views import current_user, UserList, SubjectList, UploadFileView, UploadFileViewForFaculty, fetchFaculty

urlpatterns = [
    path('current_user/', current_user, name="currentUser"),
    path('users/', UserList.as_view()),
    path("addsubject/", SubjectList.Addsubjects, name="addSubject"),
    path("showsubject/", SubjectList.showSubjects, name="showSubject"),
    path('addStudents/',UploadFileView.as_view(), name='uploadFileForStudents'),
    path('addFaculties/',UploadFileViewForFaculty.as_view(), name='uploadFileForFaculties'),
    path('fetchFaculties/',fetchFaculty, name="Fetch Faculty")
]