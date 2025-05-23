# Generated by Django 5.1.1 on 2024-11-27 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appMain', '0006_remove_products_productcategory_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='products',
            name='productCategories',
        ),
        migrations.AddField(
            model_name='products',
            name='productCategories',
            field=models.ManyToManyField(blank=True, related_name='productCategories', to='appMain.category'),
        ),
    ]
