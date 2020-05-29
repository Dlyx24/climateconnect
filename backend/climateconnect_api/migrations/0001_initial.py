# Generated by Django 2.2.11 on 2020-03-31 03:58

import climateconnect_api.models.user
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_slug', models.CharField(blank=True, help_text='slug for user URL', max_length=250, null=True, verbose_name='URL Slug')),
                ('profile_image', models.ImageField(blank=True, help_text="Points to user's profile picture", null=True, upload_to=climateconnect_api.models.user.profile_image_path, verbose_name='Profile Image')),
                ('background_image', models.ImageField(blank=True, help_text="Points to user's background image", null=True, upload_to=climateconnect_api.models.user.background_image_path, verbose_name='Background Image')),
                ('biography', models.TextField(blank=True, help_text="Points to user's bio", null=True, verbose_name='bio')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Time when object first created', verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Time when profile was updated', verbose_name='Update at')),
                ('is_profile_verified', models.BooleanField(default=False, help_text="Checks whether user's profile is verfied or not", verbose_name='Is profile verified')),
                ('user', models.OneToOneField(help_text='Points to user table', on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'User Profile',
                'verbose_name_plural': 'User Profiles',
                'db_table': 'climateconnect_user_profile',
            },
        ),
    ]