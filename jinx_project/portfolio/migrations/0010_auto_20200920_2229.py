# Generated by Django 3.1 on 2020-09-20 12:29

from django.db import migrations, models
import portfolio.models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0009_imagesection_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagesection',
            name='image',
            field=models.ImageField(null=True, upload_to=portfolio.models.Image.image_path),
        ),
    ]