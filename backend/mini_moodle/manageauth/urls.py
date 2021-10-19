from os import name
from django.urls import path
from .views import current_user, UserList, SubjectList, UploadFileView, UploadFileViewForFaculty, fetchFaculty,SubjectAllocationList, fetchStudents

urlpatterns = [
    path('current_user/', current_user, name="currentUser"),
    path('users/', UserList.as_view()),
    path("addsubject/", SubjectList.Addsubjects, name="addSubject"),
    path("showsubject/", SubjectList.showSubjects, name="showSubject"),
    path('addStudents/',UploadFileView.as_view(), name='uploadFileForStudents'),
    path('addFaculties/',UploadFileViewForFaculty.as_view(), name='uploadFileForFaculties'),
    path('fetchFaculties/',fetchFaculty, name="Fetch Faculty"),
    path('allocateSubjects/',SubjectAllocationList.AllocateSubject,name="allocateSubjects"),
    path('showallocateSubjects/',SubjectAllocationList.ShowAllocatedSubject,name="showAllocateSubjects"),
    path("fetchSubject/<int:id>", SubjectAllocationList.fetchSubject, name="AllocatedSubjects"),
    path("fetchStudents/", fetchStudents, name="fetchstudents")
]
