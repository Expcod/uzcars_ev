
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.db.models import Count, Sum, Avg
from django.http import JsonResponse
from django_tables2 import SingleTableView, SingleTableMixin
from django_filters.views import FilterView


from .models import Car, Owner, ChargingStation, Sale, Service
from .forms import CarForm, OwnerForm, ChargingStationForm, SaleForm, ServiceForm
from .tables import CarTable, OwnerTable, ChargingStationTable, SaleTable, ServiceTable
from .filters import CarFilter, OwnerFilter, ChargingStationFilter, SaleFilter, ServiceFilter

def dashboard(request):
    # Count statistics
    cars_count = Car.objects.count()
    owners_count = Owner.objects.count()
    stations_count = ChargingStation.objects.count()
    sales_count = Sale.objects.count()
    
    # Calculate total sales value
    total_sales = Sale.objects.aggregate(total=Sum('sale_price'))['total'] or 0
    
    # Calculate average battery capacity
    avg_battery = Car.objects.aggregate(avg=Avg('battery_capacity'))['avg'] or 0
    
    # Get recent sales
    recent_sales = Sale.objects.select_related('car', 'owner').order_by('-sale_date')[:5]
    
    # Get service statistics
    services_count = Service.objects.count()
    
    context = {
        'cars_count': cars_count,
        'owners_count': owners_count,
        'stations_count': stations_count,
        'sales_count': sales_count,
        'total_sales': total_sales,
        'avg_battery': avg_battery,
        'recent_sales': recent_sales,
        'services_count': services_count,
    }
    
    return render(request, 'uzcars_app/dashboard.html', context)

def cars_by_brand_chart_data(request):
    cars_by_brand = Car.objects.values('brand').annotate(count=Count('id'))
    
    data = {
        'labels': [item['brand'] for item in cars_by_brand],
        'datasets': [{
            'label': 'Number of Cars',
            'data': [item['count'] for item in cars_by_brand],
            'backgroundColor': [
                '#4c78a8', '#f58518', '#e45756', '#72b7b2', '#54a24b', 
                '#eeca3b', '#b279a2', '#ff9da6', '#9d755d', '#bab0ac'
            ]
        }]
    }
    
    return JsonResponse(data)

# MySQL uchun DATE_FORMAT funksiyasini aniqlash
class DateFormat():
    function = 'DATE_FORMAT'
    template = "%(function)s(%(expressions)s, '%%b')"


# Car views
class CarListView(SingleTableMixin, FilterView):
    model = Car
    table_class = CarTable
    template_name = 'uzcars_app/car_list.html'
    filterset_class = CarFilter

class CarDetailView(DetailView):
    model = Car
    template_name = 'uzcars_app/car_detail.html'

class CarCreateView(CreateView):
    model = Car
    form_class = CarForm
    template_name = 'uzcars_app/car_form.html'
    success_url = reverse_lazy('car_list')

class CarUpdateView(UpdateView):
    model = Car
    form_class = CarForm
    template_name = 'uzcars_app/car_form.html'
    success_url = reverse_lazy('car_list')

class CarDeleteView(DeleteView):
    model = Car
    template_name = 'uzcars_app/car_confirm_delete.html'
    success_url = reverse_lazy('car_list')

# Owner views
class OwnerListView(SingleTableMixin, FilterView):
    model = Owner
    table_class = OwnerTable
    template_name = 'uzcars_app/owner_list.html'
    filterset_class = OwnerFilter

class OwnerDetailView(DetailView):
    model = Owner
    template_name = 'uzcars_app/owner_detail.html'

class OwnerCreateView(CreateView):
    model = Owner
    form_class = OwnerForm
    template_name = 'uzcars_app/owner_form.html'
    success_url = reverse_lazy('owner_list')

class OwnerUpdateView(UpdateView):
    model = Owner
    form_class = OwnerForm
    template_name = 'uzcars_app/owner_form.html'
    success_url = reverse_lazy('owner_list')

class OwnerDeleteView(DeleteView):
    model = Owner
    template_name = 'uzcars_app/owner_confirm_delete.html'
    success_url = reverse_lazy('owner_list')

# ChargingStation views
class ChargingStationListView(SingleTableMixin, FilterView):
    model = ChargingStation
    table_class = ChargingStationTable
    template_name = 'uzcars_app/charging_station_list.html'
    filterset_class = ChargingStationFilter

class ChargingStationDetailView(DetailView):
    model = ChargingStation
    template_name = 'uzcars_app/charging_station_detail.html'

class ChargingStationCreateView(CreateView):
    model = ChargingStation
    form_class = ChargingStationForm
    template_name = 'uzcars_app/charging_station_form.html'
    success_url = reverse_lazy('charging_station_list')

class ChargingStationUpdateView(UpdateView):
    model = ChargingStation
    form_class = ChargingStationForm
    template_name = 'uzcars_app/charging_station_form.html'
    success_url = reverse_lazy('charging_station_list')

class ChargingStationDeleteView(DeleteView):
    model = ChargingStation
    template_name = 'uzcars_app/charging_station_confirm_delete.html'
    success_url = reverse_lazy('charging_station_list')

# Sale views
class SaleListView(SingleTableMixin, FilterView):
    model = Sale
    table_class = SaleTable
    template_name = 'uzcars_app/sale_list.html'
    filterset_class = SaleFilter

class SaleDetailView(DetailView):
    model = Sale
    template_name = 'uzcars_app/sale_detail.html'

class SaleCreateView(CreateView):
    model = Sale
    form_class = SaleForm
    template_name = 'uzcars_app/sale_form.html'
    success_url = reverse_lazy('sale_list')

class SaleUpdateView(UpdateView):
    model = Sale
    form_class = SaleForm
    template_name = 'uzcars_app/sale_form.html'
    success_url = reverse_lazy('sale_list')

class SaleDeleteView(DeleteView):
    model = Sale
    template_name = 'uzcars_app/sale_confirm_delete.html'
    success_url = reverse_lazy('sale_list')

# Service views
class ServiceListView(SingleTableMixin, FilterView):
    model = Service
    table_class = ServiceTable
    template_name = 'uzcars_app/service_list.html'
    filterset_class = ServiceFilter

class ServiceDetailView(DetailView):
    model = Service
    template_name = 'uzcars_app/service_detail.html'

class ServiceCreateView(CreateView):
    model = Service
    form_class = ServiceForm
    template_name = 'uzcars_app/service_form.html'
    success_url = reverse_lazy('service_list')

class ServiceUpdateView(UpdateView):
    model = Service
    form_class = ServiceForm
    template_name = 'uzcars_app/service_form.html'
    success_url = reverse_lazy('service_list')

class ServiceDeleteView(DeleteView):
    model = Service
    template_name = 'uzcars_app/service_confirm_delete.html'
    success_url = reverse_lazy('service_list')
