# Generated by Django 3.2.9 on 2022-01-30 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_artworkgallerypicture_art_work'),
    ]

    operations = [
        migrations.AddField(
            model_name='artwork',
            name='preview_pic',
            field=models.ImageField(default='', upload_to='artwork_gallery_images'),
        ),
    ]
