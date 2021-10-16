from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, serializers, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, SubjectSerializer, FileUploadSerializer
from .models import Subject
import os, csv, pandas as pd

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class SubjectList(APIView):
    permission_classes = (permissions.AllowAny,)

    @api_view(["POST"])
    def Addsubjects(request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            print("Data ",serializer)
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)

    @api_view(['GET'])
    def showSubjects(request):
        subject = Subject.objects.all()
        serialize = SubjectSerializer(subject, many=True)
        return Response(serialize.data)

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
                is_staff=row["is_staff"]
            )
            new_file.save()
        return Response({"status":"success"})