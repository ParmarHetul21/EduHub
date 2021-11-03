from datetime import date
from django.http import HttpResponseRedirect, response
from django.contrib.auth.models import User
from rest_framework import permissions, serializers, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SubjectAllocationSerializer, UserSerializer, UserSerializerWithToken, SubjectSerializer, FileUploadSerializer, StudentProfileSerializer,UserFileUploadSerializer
from .models import Subject, SubjectAllocation, StudentProfile, FileUpload
import os, csv, pandas as pd

@api_view(['POST'])
def uploadFile(request):
    serializer = UserFileUploadSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        print(serializer)
    print(serializer.errors)
    return Response("data inserted")

@api_view(['GET'])
def fetchFiles(request):
    data = FileUpload.objects.all()
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