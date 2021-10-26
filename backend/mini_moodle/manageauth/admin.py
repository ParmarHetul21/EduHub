from django.contrib import admin
from .models import FileUpload, Subject, SubjectAllocation, StudentProfile

# Register your models here.
admin.site.register(Subject)
admin.site.register(SubjectAllocation)
admin.site.register(StudentProfile)
admin.site.register(FileUpload)