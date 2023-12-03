from django.shortcuts import render
from Produk.models import *
from rest_framework import generics, filters, permissions
from .serializers import *
from rest_framework.response import Response


# Create your views here.
class ProdukListCreateView(generics.ListCreateAPIView):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['id_produk']

class ProdukListFilterByStatusView(generics.ListAPIView):
    serializer_class = ProdukSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['id_produk']

    def get_queryset(self):
        status = self.kwargs['status']
        return Produk.objects.filter(status=status)
    
class ProdukListFilterStatusView(generics.ListAPIView):
    serializer_class = ProdukSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['id_produk']

    def get_queryset(self):
        return Produk.objects.filter(status=1)
    

class ProdukRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer

class KategoriListCreateView(generics.ListCreateAPIView):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['id_kategori']



