# Generated by Django 3.2.9 on 2021-11-30 11:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_userachievement'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='last_name',
        ),
    ]