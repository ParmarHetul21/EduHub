# Generated by Django 2.2 on 2021-10-28 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageauth', '0012_auto_20211028_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentprofile',
            name='enrollment',
            field=models.CharField(default=True, max_length=20, unique=True),
        ),
    ]
