# Generated by Django 3.2.15 on 2022-11-21 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climateconnect_api', '0092_auto_20221115_0946'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='role',
            field=models.IntegerField(choices=[(0, 'User'), (1, 'Moderator'), (2, 'Admin')], default=0, help_text='Type of role', verbose_name='Role Type'),
        ),
    ]
