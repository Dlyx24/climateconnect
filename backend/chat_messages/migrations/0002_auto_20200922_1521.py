# Generated by Django 2.2.13 on 2020-09-22 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_messages', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-id'], 'verbose_name': 'Message', 'verbose_name_plural': 'Messages'},
        ),
    ]