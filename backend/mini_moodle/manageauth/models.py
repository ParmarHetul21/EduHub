from django.db import models

# Create your models here.
class Subject(models.Model):
    subjectname = models.CharField( max_length=150 )
    course = models.CharField( max_length = 150, default="MCA" )
    semester = models.IntegerField()

    def __str__(self):
        return self.subjectname