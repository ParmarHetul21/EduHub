# Generated by Django 3.2.7 on 2021-10-19 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageauth', '0004_auto_20211018_2157'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=150)),
                ('semester', models.IntegerField()),
            ],
        ),
    ]
