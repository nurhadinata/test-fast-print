from rest_framework import serializers
from .models import *

class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ('id_kategori', 'nama_kategori',)

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('nama_status',)

class ProdukSerializer(serializers.ModelSerializer):
    nama_kategori = serializers.CharField(source='kategori.nama_kategori')
    class Meta:
        
        model = Produk
        fields = ('__all__')
        extra_kwargs = {'nama_kategori': {'required': False}} 



        
    

    

