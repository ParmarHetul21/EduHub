# Generated by Django 2.2 on 2021-10-16 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageauth', '0002_alter_subject_semester'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='course',
            field=models.CharField(default='MCA', max_length=150),
        ),
        migrations.AlterField(
            model_name='subject',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]