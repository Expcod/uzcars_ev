import django_filters
from .models import Car, Owner, ChargingStation, Sale, Service

class CarFilter(django_filters.FilterSet):
    brand = django_filters.CharFilter(lookup_expr='icontains', label='Brand')
    model = django_filters.CharFilter(lookup_expr='icontains', label='Model')
    year = django_filters.NumberFilter(label='Year')
    
    class Meta:
        model = Car
        fields = ['brand', 'model', 'year']

class OwnerFilter(django_filters.FilterSet):
    first_name = django_filters.CharFilter(lookup_expr='icontains', label='First Name')
    last_name = django_filters.CharFilter(lookup_expr='icontains', label='Last Name')
    
    class Meta:
        model = Owner
        fields = ['first_name', 'last_name']

class ChargingStationFilter(django_filters.FilterSet):
    station_name = django_filters.CharFilter(lookup_expr='icontains', label='Station Name')
    location = django_filters.CharFilter(lookup_expr='icontains', label='Location')
    charging_type = django_filters.ChoiceFilter(choices=ChargingStation.CHARGING_TYPE_CHOICES, label='Charging Type')
    
    class Meta:
        model = ChargingStation
        fields = ['station_name', 'location', 'charging_type']

class SaleFilter(django_filters.FilterSet):
    car__brand = django_filters.CharFilter(lookup_expr='icontains', label='Car Brand')
    owner__last_name = django_filters.CharFilter(lookup_expr='icontains', label='Owner Last Name')
    sale_date = django_filters.DateFilter(label='Sale Date')
    
    class Meta:
        model = Sale
        fields = ['car__brand', 'owner__last_name', 'sale_date']

class ServiceFilter(django_filters.FilterSet):
    car__brand = django_filters.CharFilter(lookup_expr='icontains', label='Car Brand')
    service_type = django_filters.CharFilter(lookup_expr='icontains', label='Service Type')
    service_date = django_filters.DateFilter(label='Service Date')
    
    class Meta:
        model = Service
        fields = ['car__brand', 'service_type', 'service_date']
