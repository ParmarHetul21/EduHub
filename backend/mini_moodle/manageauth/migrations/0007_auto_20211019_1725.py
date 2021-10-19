# Generated by Django 3.2.7 on 2021-10-19 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageauth', '0006_alter_studentprofile_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentprofile',
            name='username',
            field=models.CharField(max_length=150),
        ),
        migrations.AddConstraint(
            model_name='studentprofile',
            constraint=models.UniqueConstraint(fields=('username',), name='manageauth_studentprofile_unique'),
        ),
    ]
