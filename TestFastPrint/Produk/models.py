from django.db import models
import uuid

# Create your models here.

class Kategori(models.Model):
    id_kategori = models.BigAutoField(primary_key=True, editable=False)
    nama_kategori = models.CharField(max_length=255, null=True, default="")

class Status(models.Model):
    id_status = models.BigAutoField(primary_key=True, editable=False)
    nama_status = models.CharField(max_length=25, null=False, default="bisa dijual")

class Produk(models.Model):
    id_produk = models.BigAutoField(primary_key=True, editable=False, )
    nama_produk = models.CharField(max_length=255, null=True, default="")
    harga = models.BigIntegerField(default=100000, null=True)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, default=1, blank=False)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1, blank=False)
