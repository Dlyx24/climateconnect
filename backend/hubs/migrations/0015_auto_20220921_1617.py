# Generated by Django 3.2.15 on 2022-09-21 16:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hubs', '0014_merge_0012_localambassador_0013_auto_20220419_0744'),
    ]

    operations = [
        migrations.CreateModel(
            name='HubAmbassador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='Ambassador title', max_length=1024, null=True, verbose_name='Ambassador title')),
                ('title_de', models.CharField(blank=True, help_text="The german translation of the ambassador's title", max_length=1024, null=True, verbose_name='Ambassador title german')),
                ('custom_message', models.CharField(blank=True, help_text='Custom message motivating users to contact the ambassador', max_length=240, null=True, verbose_name='Custom message')),
                ('custom_message_de', models.CharField(blank=True, help_text='German translation of the custom message', max_length=240, null=True, verbose_name='Custom message german')),
                ('hub', models.ForeignKey(blank=True, help_text='Points to hub the user is ambassador of', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ambassador_hub', to='hubs.hub', verbose_name='Hub')),
                ('user', models.ForeignKey(blank=True, help_text='Points to user who is ambassador of the hub', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ambassador_user', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Local Ambassador',
                'verbose_name_plural': 'Local Ambassadors',
            },
        ),
        migrations.DeleteModel(
            name='LocalAmbassador',
        ),
    ]
