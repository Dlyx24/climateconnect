# Generated by Django 2.2.11 on 2020-04-29 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('climateconnect_api', '0007_auto_20200418_1622'),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the role', max_length=128, verbose_name='Name')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Time when role was created', verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Time when role was updated', verbose_name='Updated At')),
            ],
            options={
                'verbose_name': 'Role',
                'verbose_name_plural': 'Roles',
            },
        ),
    ]
