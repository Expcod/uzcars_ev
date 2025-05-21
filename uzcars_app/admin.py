from django.contrib import admin
from .models import Car, Owner, ChargingStation, Sale, Service

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'price', 'battery_capacity', 'charging_time', 'range_km')
    list_filter = ('brand', 'year')
    search_fields = ('brand', 'model')

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone')
    search_fields = ('first_name', 'last_name', 'phone')

@admin.register(ChargingStation)
class ChargingStationAdmin(admin.ModelAdmin):
    list_display = ('station_name', 'location', 'charging_type', 'power_kw')
    list_filter = ('charging_type',)
    search_fields = ('station_name', 'location')

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('car', 'owner', 'sale_date', 'sale_price')
    list_filter = ('sale_date',)
    date_hierarchy = 'sale_date'
    search_fields = ('car__brand', 'car__model', 'owner__first_name', 'owner__last_name')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('car', 'service_type', 'service_date', 'service_cost')
    list_filter = ('service_date', 'service_type')
    date_hierarchy = 'service_date'
    search_fields = ('car__brand', 'car__model', 'service_type')
