# Generated by Django 2.2.24 on 2021-11-25 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climateconnect_api', '0072_donation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='date_cancelled',
            field=models.DateTimeField(blank=True, help_text='Date and time when the donation was cancelled (only for recurring donations)', null=True, verbose_name='Date cancelled'),
        ),
    ]
