# Generated by Django 4.1.10 on 2023-12-03 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Produk', '0007_alter_produk_harga'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kategori',
            name='nama_kategori',
            field=models.CharField(default='', max_length=255, null=True),
        ),
    ]
