# Generated by Django 3.1 on 2020-09-22 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0020_auto_20200922_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardsection',
            name='content',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='ImageTextSection',
        ),
    ]