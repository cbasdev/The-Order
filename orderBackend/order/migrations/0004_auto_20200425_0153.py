# Generated by Django 3.0.5 on 2020-04-25 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_auto_20200424_2345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='order',
            name='status_place',
            field=models.IntegerField(),
        ),
    ]