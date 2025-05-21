from django.urls import path
from . import views

urlpatterns = [
    # Dashboard
    path('', views.dashboard, name='dashboard'),
    path('api/cars-by-brand/', views.cars_by_brand_chart_data, name='cars_by_brand_chart_data'),
    
    # Cars
    path('cars/', views.CarListView.as_view(), name='car_list'),
    path('cars/<int:pk>/', views.CarDetailView.as_view(), name='car_detail'),
    path('cars/new/', views.CarCreateView.as_view(), name='car_create'),
    path('cars/<int:pk>/edit/', views.CarUpdateView.as_view(), name='car_update'),
    path('cars/<int:pk>/delete/', views.CarDeleteView.as_view(), name='car_delete'),
    
    # Owners
    path('owners/', views.OwnerListView.as_view(), name='owner_list'),
    path('owners/<int:pk>/', views.OwnerDetailView.as_view(), name='owner_detail'),
    path('owners/new/', views.OwnerCreateView.as_view(), name='owner_create'),
    path('owners/<int:pk>/edit/', views.OwnerUpdateView.as_view(), name='owner_update'),
    path('owners/<int:pk>/delete/', views.OwnerDeleteView.as_view(), name='owner_delete'),
    
    # Charging Stations
    path('charging-stations/', views.ChargingStationListView.as_view(), name='charging_station_list'),
    path('charging-stations/<int:pk>/', views.ChargingStationDetailView.as_view(), name='charging_station_detail'),
    path('charging-stations/new/', views.ChargingStationCreateView.as_view(), name='charging_station_create'),
    path('charging-stations/<int:pk>/edit/', views.ChargingStationUpdateView.as_view(), name='charging_station_update'),
    path('charging-stations/<int:pk>/delete/', views.ChargingStationDeleteView.as_view(), name='charging_station_delete'),
    
    # Sales
    path('sales/', views.SaleListView.as_view(), name='sale_list'),
    path('sales/<int:pk>/', views.SaleDetailView.as_view(), name='sale_detail'),
    path('sales/new/', views.SaleCreateView.as_view(), name='sale_create'),
    path('sales/<int:pk>/edit/', views.SaleUpdateView.as_view(), name='sale_update'),
    path('sales/<int:pk>/delete/', views.SaleDeleteView.as_view(), name='sale_delete'),
    
    # Services
    path('services/', views.ServiceListView.as_view(), name='service_list'),
    path('services/<int:pk>/', views.ServiceDetailView.as_view(), name='service_detail'),
    path('services/new/', views.ServiceCreateView.as_view(), name='service_create'),
    path('services/<int:pk>/edit/', views.ServiceUpdateView.as_view(), name='service_update'),
    path('services/<int:pk>/delete/', views.ServiceDeleteView.as_view(), name='service_delete'),
]
