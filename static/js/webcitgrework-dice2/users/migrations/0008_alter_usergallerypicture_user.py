# Generated by Django 3.2.9 on 2021-11-28 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_rename_gallerypicture_usergallerypicture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergallerypicture',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_images', to='users.userprofile'),
        ),
    ]