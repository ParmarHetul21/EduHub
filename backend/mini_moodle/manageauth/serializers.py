from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Subject, SubjectAllocation, StudentProfile

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username','id','email','is_superuser','is_staff')

class StudentProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentProfile
        fields = "__all__"

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = "__all__"

class SubjectAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectAllocation
        fields = "__all__"

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class SaveFileSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = "__all__"
