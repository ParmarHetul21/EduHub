from os import name
from django.urls import path

from .views import current_user, UserList, SubjectList,fetchAllFiles , rejectFiles,downloadMaterial,approveFiles,fetchNotAprrovedFiles, currentStudent, fetchFiles, fetchFileRequests, UploadFileView, UploadFileViewForFaculty, fetchFaculty,SubjectAllocationList, fetchStudents,uploadFile, sendMail

urlpatterns = [
    path('current_user/', current_user, name="currentUser"),
    path('currentStudent/<str:id>/', currentStudent, name="currentStudent"),
    path('users/', UserList.as_view()),
    path("addsubject/", SubjectList.Addsubjects, name="addSubject"),
    path("showsubject/", SubjectList.showSubjects, name="showSubject"),
    path('addStudents/',UploadFileView.as_view(), name='uploadFileForStudents'),
    path('addFaculties/',UploadFileViewForFaculty.as_view(), name='uploadFileForFaculties'),
    path('fetchFaculties/',fetchFaculty, name="Fetch Faculty"),
    path('allocateSubjects/',SubjectAllocationList.AllocateSubject,name="allocateSubjects"),
    path('showallocateSubjects/',SubjectAllocationList.ShowAllocatedSubject,name="showAllocateSubjects"),
    path("fetchSubject/<int:id>", SubjectAllocationList.fetchSubject, name="AllocatedSubjects"),
    path("fetchStudents/", fetchStudents, name="fetchstudents"),
    path("deleteallocatedSubjects/<int:userID>/<int:subjectID>",SubjectAllocationList.deleteAllocatedSubject, name="deleteallocatesubject"),
    path("deleteSubject/<int:id>", SubjectList.deleteSubjects, name="deleteSubject"),
    path("uploadFile/",uploadFile,name="uploadFile"),
    path("fetchFiles/", fetchFiles, name="fetchFiles"),
    path("fetchFileRequests/", fetchFileRequests, name="fetchFilerequests"),
    path("sendMail/",sendMail, name="send mail"),
    path("approveFile/<int:fid>/",approveFiles,name="approveFile"),
    path("rejectFile/<int:fid>/",rejectFiles,name="rejected files"),
    #TODO: New routes added
    path("notapprovedfiles/", fetchNotAprrovedFiles, name="notapproved"),
    path("downloadMaterial/<int:id>/",downloadMaterial, name="Download Material"),
    path("fetchAllFiles/<int:id>/", fetchAllFiles, name="fetchallfiles"),
]

