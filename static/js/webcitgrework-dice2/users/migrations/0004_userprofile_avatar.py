# Generated by Django 3.2.9 on 2021-11-28 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_userprofile_software'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(default='default.jpg', upload_to='profile_pics'),
        ),
    ]
