from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Subject(models.Model):
    subjectname = models.CharField( max_length=150 )
    course = models.CharField( max_length = 150, default="MCA" )
    semester = models.IntegerField()

    def __str__(self):
        return self.subjectname
    
class SubjectAllocation(models.Model):
    userID = models.ForeignKey(User,on_delete=models.CASCADE,default=True)
    subjectID = models.ForeignKey(Subject,on_delete=models.CASCADE,default=True)

    def __str__(self):
        return str(self.userID)

class StudentProfile(models.Model):
    username = models.CharField(max_length = 150, unique=True)
    enrollment = models.CharField(max_length = 20, unique=True, default=True)
    semester = models.IntegerField()
    batch = models.CharField(max_length = 20, default=True)
    mobile = models.IntegerField(default=True)

    def __str__(self):
        return self.username

class FileUpload(models.Model):
    fileName = models.CharField(max_length=150,null=True)
    file = models.FileField()
    subjectID = models.ForeignKey(Subject,on_delete=models.CASCADE,default=True)
    userID = models.ForeignKey(User,on_delete=models.CASCADE,default=True)
    whichUser = models.CharField(max_length=10, default=True)

    def __str__(self):
        return self.fileName