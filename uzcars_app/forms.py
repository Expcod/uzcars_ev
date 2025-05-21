from django import forms
from .models import Car, Owner, ChargingStation, Sale, Service

class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = ['brand', 'model', 'year', 'price', 'battery_capacity', 'charging_time', 'range_km']
        widgets = {
            'year': forms.NumberInput(attrs={'min': 2000, 'max': 2030}),
            'price': forms.NumberInput(attrs={'step': '0.01'}),
            'battery_capacity': forms.NumberInput(attrs={'step': '0.1'}),
            'charging_time': forms.NumberInput(attrs={'step': '0.1'}),
        }

class OwnerForm(forms.ModelForm):
    class Meta:
        model = Owner
        fields = ['first_name', 'last_name', 'phone', 'address']

class ChargingStationForm(forms.ModelForm):
    class Meta:
        model = ChargingStation
        fields = ['station_name', 'location', 'charging_type', 'power_kw']
        widgets = {
            'power_kw': forms.NumberInput(attrs={'step': '0.1'}),
        }

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = ['car', 'owner', 'sale_date', 'sale_price']
        widgets = {
            'sale_date': forms.DateInput(attrs={'type': 'date'}),
            'sale_price': forms.NumberInput(attrs={'step': '0.01'}),
        }

class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['car', 'service_type', 'service_date', 'service_cost']
        widgets = {
            'service_date': forms.DateInput(attrs={'type': 'date'}),
            'service_cost': forms.NumberInput(attrs={'step': '0.01'}),
        }
