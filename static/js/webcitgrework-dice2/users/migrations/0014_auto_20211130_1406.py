# Generated by Django 3.2.9 on 2021-11-30 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20211130_1355'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='software',
            name='user',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='software',
            field=models.ManyToManyField(to='users.Software'),
        ),
    ]