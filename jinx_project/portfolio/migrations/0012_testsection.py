# Generated by Django 3.1 on 2020-09-21 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0011_imagetextsection'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
