# Generated by Django 3.1 on 2020-08-27 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sign_Up',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=250)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
    ]
