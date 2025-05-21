import django_tables2 as tables
from .models import Car, Owner, ChargingStation, Sale, Service
from django.utils.html import format_html

class CarTable(tables.Table):
    actions = tables.Column(empty_values=(), orderable=False)
    
    class Meta:
        model = Car
        template_name = "django_tables2/bootstrap5.html"
        fields = ('id', 'brand', 'model', 'year', 'price', 'battery_capacity', 'charging_time', 'range_km')
        attrs = {"class": "table table-striped table-hover"}
    
    def render_price(self, value):
        return f"${value:,.2f}"
    
    def render_battery_capacity(self, value):
        return f"{value} kWh"
    
    def render_charging_time(self, value):
        return f"{value} h"
    
    def render_range_km(self, value):
        return f"{value} km"
    
    def render_actions(self, record):
        return format_html(
            '<a href="{}" class="btn btn-sm btn-primary">Edit</a> '
            '<a href="{}" class="btn btn-sm btn-danger">Delete</a>',
            record.get_absolute_url(),
            f"/cars/{record.id}/delete/"
        )

class OwnerTable(tables.Table):
    actions = tables.Column(empty_values=(), orderable=False)
    
    class Meta:
        model = Owner
        template_name = "django_tables2/bootstrap5.html"
        fields = ('id', 'first_name', 'last_name', 'phone', 'address')
        attrs = {"class": "table table-striped table-hover"}
    
    def render_actions(self, record):
        return format_html(
            '<a href="{}" class="btn btn-sm btn-primary">Edit</a> '
            '<a href="{}" class="btn btn-sm btn-danger">Delete</a>',
            record.get_absolute_url(),
            f"/owners/{record.id}/delete/"
        )

class ChargingStationTable(tables.Table):
    actions = tables.Column(empty_values=(), orderable=False)
    
    class Meta:
        model = ChargingStation
        template_name = "django_tables2/bootstrap5.html"
        fields = ('id', 'station_name', 'location', 'charging_type', 'power_kw')
        attrs = {"class": "table table-striped table-hover"}
    
    def render_power_kw(self, value):
        return f"{value} kW"
    
    def render_charging_type(self, value):
        badge_class = {
            'DC': 'bg-primary',
            'AC': 'bg-success',
            'Wireless': 'bg-info'
        }.get(value, 'bg-secondary')
        
        return format_html('<span class="badge {}">{}</span>', badge_class, value)
    
    def render_actions(self, record):
        return format_html(
            '<a href="{}" class="btn btn-sm btn-primary">Edit</a> '
            '<a href="{}" class="btn btn-sm btn-danger">Delete</a>',
            record.get_absolute_url(),
            f"/charging-stations/{record.id}/delete/"
        )

class SaleTable(tables.Table):
    actions = tables.Column(empty_values=(), orderable=False)
    car = tables.Column(accessor='car.brand', verbose_name='Car Brand')
    car_model = tables.Column(accessor='car.model', verbose_name='Car Model')
    owner_name = tables.Column(accessor='owner', verbose_name='Owner')
    
    class Meta:
        model = Sale
        template_name = "django_tables2/bootstrap5.html"
        fields = ('id', 'car', 'car_model', 'owner_name', 'sale_date', 'sale_price')
        attrs = {"class": "table table-striped table-hover"}
    
    def render_sale_price(self, value):
        return f"${value:,.2f}"
    
    def render_actions(self, record):
        return format_html(
            '<a href="{}" class="btn btn-sm btn-primary">Edit</a> '
            '<a href="{}" class="btn btn-sm btn-danger">Delete</a>',
            record.get_absolute_url(),
            f"/sales/{record.id}/delete/"
        )

class ServiceTable(tables.Table):
    actions = tables.Column(empty_values=(), orderable=False)
    car = tables.Column(accessor='car.brand', verbose_name='Car Brand')
    car_model = tables.Column(accessor='car.model', verbose_name='Car Model')
    
    class Meta:
        model = Service
        template_name = "django_tables2/bootstrap5.html"
        fields = ('id', 'car', 'car_model', 'service_type', 'service_date', 'service_cost')
        attrs = {"class": "table table-striped table-hover"}
    
    def render_service_cost(self, value):
        return f"${value:,.2f}"
    
    def render_actions(self, record):
        return format_html(
            '<a href="{}" class="btn btn-sm btn-primary">Edit</a> '
            '<a href="{}" class="btn btn-sm btn-danger">Delete</a>',
            record.get_absolute_url(),
            f"/services/{record.id}/delete/"
        )
