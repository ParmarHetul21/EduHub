# Generated by Django 3.2.7 on 2021-10-19 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageauth', '0005_studentprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentprofile',
            name='username',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
