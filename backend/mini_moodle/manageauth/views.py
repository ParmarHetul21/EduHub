from datetime import date
from django.db.models import manager
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import permissions, serializers, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SubjectAllocationSerializer, UserSerializer, UserSerializerWithToken, SubjectSerializer, FileUploadSerializer, StudentProfileSerializer,UserFileUploadSerializer
from .models import Subject, SubjectAllocation, StudentProfile, FileUpload
import pandas as pd
from wsgiref.util import FileWrapper
from django.core.mail import send_mail
import os

@api_view(['POST'])
def uploadFile(request):
    serializer = UserFileUploadSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    print(serializer.errors)
    return Response("data inserted")

@api_view(['GET'])
def fetchFiles(request):
    data = FileUpload.objects.filter(isApproved=True)
    serializer = UserFileUploadSerializer(data, many=True)
    return Response(serializer.data)

# TODO: Fetch all files
@api_view(['GET'])
def fetchAllFiles(request, id):
    data = FileUpload.objects.filter(userID=id)
    serializers = UserFileUploadSerializer(data , many=True)
    return Response(serializers.data)

# TODO: fetch the not approved files for the students
@api_view(['GET'])
def fetchNotAprrovedFiles(request):
    data = FileUpload.objects.filter(isApproved=False, whichUser="student")
    serializer = UserFileUploadSerializer(data, many=True)
    return Response(serializer.data)

#TODO: for approving files uploaded by users
@api_view(["GET","POST"])
def approveFiles(request,fid):
    data = FileUpload.objects.filter(id=fid)
    if request.method == "POST":
        fdata = FileUpload.objects.get(id=fid)
        fdata.isApproved = True
        fdata.save()
        return Response("File has been approved")
    serializer = UserFileUploadSerializer(data, many=True)
    return Response(serializer.data)


#for rejecting files uploaded by users
@api_view(["GET","POST"])
def rejectFiles(request,fid):
    data = FileUpload.objects.filter(id=fid)
    if request.method == "POST":
        fdata = FileUpload.objects.get(id=fid)
        fdata.isApproved = False
        fdata.isRejected = True
        fdata.save()
        return Response("File has been Rejected")
    serializer = UserFileUploadSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def fetchFileRequests(request):
    data = FileUpload.objects.filter(isApproved=False, isRejected=False)
    serializer = UserFileUploadSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def currentStudent(request,id):
    data_list = []
    data = User.objects.filter(username = id)
    serializer = UserSerializer(data,many=True)
    # print(serializer.data)
    for i in serializer.data:
        data_list.append(i)
        student_serializer = StudentProfileSerializer(StudentProfile.objects.filter(username=i["username"]), many=True)
        for j in student_serializer.data:
            for k in data_list:
                print(k["username"])
                print(j["username"])
                if(k["username"] == j["username"]):
                    k["passwordStatus"] = j["passwordStatus"]
    return Response(data_list)

@api_view(['GET'])
def fetchFaculty(request):
    faculty = User.objects.filter(is_staff=True,is_superuser=False)
    serializer = UserSerializer(faculty, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def sendMail(request):
    if request.method == "POST":
        students = User.objects.filter(is_staff=False).values_list('email',flat=True)
        send_mail('EduHubLogin',
        'Abcd@1234 is the password for your login purpose',
        'nikhil.parmar.alive@gmail.com',
        list(students),
        fail_silently=False,)
    return Response("Mail sent successfully")
    

#for fetching student from User table
@api_view(['GET'])
def fetchStudents(request):
    data_list = []
    student = User.objects.filter(is_staff=False,is_superuser=False)
    serializer = UserSerializer(student, many=True)    
    for i in serializer.data:
        data_list.append(i)            
        student_serializer = StudentProfileSerializer(StudentProfile.objects.filter(username=i["username"]), many=True)
        # print("data of students",student_serializer.data)
        for j in student_serializer.data:
            for i in data_list:
                print(i["username"])
                print(j["username"])
                if(i["username"] == j["username"]):                
                    i["semester"] = j["semester"]
                    i["enrollment"] = j["enrollment"]
                    i["mobile"] = j["mobile"]
                    i["batch"] = j["batch"]
                    i["first_name"] = i["first_name"]
                    i["last_name"] = i["last_name"]
                    i["passwordStatus"] = j["passwordStatus"]
    return Response(data_list)

class SubjectAllocationList(APIView):
    permission_classes = (permissions.AllowAny,)

    @api_view(["POST"])
    def AllocateSubject(request):
        serializer = SubjectAllocationSerializer(data=request.data)
        if serializer.is_valid():
            userid = serializer.validated_data['userID']
            subjectid = serializer.validated_data['subjectID']
            allocatesubject = SubjectAllocation.objects.filter(userID = userid,subjectID = subjectid)
            if not allocatesubject:
                serializer.save()
            else:
                return Response({"Failure": ["Already Existed"]}, status=status.HTTP_400_BAD_REQUEST)
        print(serializer.errors)
        return Response(serializer.data)
    
    @api_view(["GET"])
    def ShowAllocatedSubject(request):
        data = SubjectAllocation.objects.all()
        serializer = SubjectAllocationSerializer(data,many=True)
        return Response(serializer.data)
    
    @api_view(["GET"])
    def fetchSubject(request, id):
        data_list = []
        data = SubjectAllocation.objects.filter(userID=id)
        serializers = SubjectAllocationSerializer(data, many=True)
        for i in serializers.data:
            subject_serialazed = SubjectSerializer(Subject.objects.filter(id=i["subjectID"]), many=True)
            data_list.append(subject_serialazed.data)
        return Response(data_list)
    
    @api_view(["POST"])
    def deleteAllocatedSubject(request, userID,subjectID):
        user = SubjectAllocation.objects.get(userID=userID,subjectID=subjectID)
        if user:
            user.delete()
            return Response({"status":"ok"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class SubjectList(APIView):
    permission_classes = (permissions.AllowAny,)

    @api_view(["POST"])
    def Addsubjects(request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            subjectname = serializer.validated_data['subjectname']
            addsubject = Subject.objects.filter(subjectname = subjectname)
            if not addsubject:
                serializer.save()
            else:
                return Response({"Failure": ["Already Existed"]}, status=status.HTTP_400_BAD_REQUEST)
        print(serializer.errors)
        return Response(serializer.data)

    @api_view(['GET'])
    def showSubjects(request):
        subject = Subject.objects.all()
        serialize = SubjectSerializer(subject, many=True)
        return Response(serialize.data)
    
    @api_view(['POST'])
    def deleteSubjects(request,id):
        subjectid = Subject.objects.get(id=id)
        if subjectid:
            subjectid.delete()
            return Response({"status":"ok"}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#for adding users to the model

#for adding students
class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file)
        for _, row in reader.iterrows():
            new_file = User.objects.create_user(
                username=row["username"],
                password=row["password"],
                first_name=row["firstname"],
                last_name=row["lastname"],
                email=row["email"]
            )
            user = StudentProfile(
                username=row["username"],
                enrollment=row["enrollment"],
                semester=row["semester"],
                batch=row["batch"],
                mobile=row["mobile"],
            )
            user.save()
            new_file.save()
        return Response({"status":"success"})

#for adding faculties
class UploadFileViewForFaculty(generics.CreateAPIView):
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file)
        for _, row in reader.iterrows():
            new_file = User.objects.create_user(
                username=row["username"],
                password=row["password"],
                first_name=row["firstname"],
                last_name=row["lastname"],
                email=row["email"],
                is_staff=True
            )
            new_file.save()
        return Response({"status":"success"})

@api_view(['GET'])
def downloadMaterial(request, id, format=None):
        queryset = FileUpload.objects.get(id=id)
        file_handle = queryset.file.path
        document = open(file_handle, 'rb')
        response = HttpResponse(FileWrapper(document), content_type= ['application/pdf','text/plain','application/vnd.ms-powerpoint'])
        response['Content-Disposition'] = 'attachment; filename="%s"' % queryset.file.name
        return response