from django.db import models
from django.urls import reverse

class Car(models.Model):
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    battery_capacity = models.DecimalField(max_digits=10, decimal_places=2)
    charging_time = models.DecimalField(max_digits=5, decimal_places=2)
    range_km = models.IntegerField()

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    
    def get_absolute_url(self):
        return reverse('car_detail', kwargs={'pk': self.pk})

class Owner(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_absolute_url(self):
        return reverse('owner_detail', kwargs={'pk': self.pk})

class ChargingStation(models.Model):
    CHARGING_TYPE_CHOICES = [
        ('DC', 'DC'),
        ('AC', 'AC'),
        ('Wireless', 'Wireless'),
    ]
    
    station_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    charging_type = models.CharField(max_length=50, choices=CHARGING_TYPE_CHOICES)
    power_kw = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.station_name} ({self.location})"
    
    def get_absolute_url(self):
        return reverse('charging_station_detail', kwargs={'pk': self.pk})

class Sale(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='sales')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='purchases')
    sale_date = models.DateField()
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.car} sold to {self.owner} on {self.sale_date}"
    
    def get_absolute_url(self):
        return reverse('sale_detail', kwargs={'pk': self.pk})

class Service(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='services')
    service_type = models.CharField(max_length=255)
    service_date = models.DateField()
    service_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.service_type} for {self.car} on {self.service_date}"
    
    def get_absolute_url(self):
        return reverse('service_detail', kwargs={'pk': self.pk})
