# Generated by Django 2.2.13 on 2021-04-22 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0008_locationtranslation'),
        ('hubs', '0009_hubstattranslation'),
    ]

    operations = [
        migrations.AddField(
            model_name='hub',
            name='hub_type',
            field=models.IntegerField(choices=[(0, 'sector hub'), (1, 'location hub')], default=0, help_text='Type of hub', verbose_name='Hub Type'),
        ),
        migrations.AddField(
            model_name='hub',
            name='location',
            field=models.ManyToManyField(blank=True, help_text='For location hubs: for which locations is the ClimateHub', related_name='hub_location', to='location.Location', verbose_name='Location'),
        ),
    ]
