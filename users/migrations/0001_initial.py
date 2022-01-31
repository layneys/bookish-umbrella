# Generated by Django 3.2.9 on 2022-01-29 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ArtWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('about', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'verbose_name': 'Художественная работа',
                'verbose_name_plural': 'Художественные работы',
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'verbose_name': 'Работа',
                'verbose_name_plural': 'Работы',
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Навык')),
            ],
            options={
                'verbose_name': 'Навык',
                'verbose_name_plural': 'Навыки',
            },
        ),
        migrations.CreateModel(
            name='Software',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.ImageField(upload_to='icons', verbose_name='Иконка')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Программа')),
            ],
            options={
                'verbose_name': 'Программа',
                'verbose_name_plural': 'Программы',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(default='default.jpg', upload_to='profile_pics')),
                ('username', models.CharField(blank=True, max_length=255, verbose_name='Username')),
                ('first_name', models.CharField(blank=True, max_length=255, verbose_name='Имя')),
                ('last_name', models.CharField(blank=True, max_length=255, verbose_name='Фамилия')),
                ('email', models.CharField(blank=True, max_length=255, verbose_name='Почта')),
                ('about', models.TextField(blank=True, verbose_name='О себе')),
                ('vk_link', models.CharField(blank=True, max_length=255, verbose_name='Ссылка на ВКонтакте')),
                ('tg_link', models.CharField(blank=True, max_length=255, verbose_name='Ссылка на Teleram')),
                ('whatsapp_link', models.CharField(blank=True, max_length=255, verbose_name='Ссылка на Whatsapp')),
                ('job', models.ManyToManyField(to='users.Job', verbose_name='Работа')),
                ('skills', models.ManyToManyField(to='users.Skill', verbose_name='Навыки')),
                ('software', models.ManyToManyField(to='users.Software', verbose_name='Используемые программы')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
            },
        ),
        migrations.CreateModel(
            name='UserGalleryPicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='gallery_images', verbose_name='Картинка')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_images', to='users.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='UserAchievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='achievements_images', verbose_name='Картинка')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_achievements', to='users.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='ArtWorkGalleryPicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='artwork_gallery_images')),
                ('art_work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.artwork')),
            ],
            options={
                'verbose_name': 'Картинка художественной работы',
                'verbose_name_plural': 'Картинки художественной работы',
            },
        ),
        migrations.AddField(
            model_name='artwork',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.userprofile'),
        ),
    ]