# Generated by Django 4.2.7 on 2025-05-21 12:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('year', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('battery_capacity', models.DecimalField(decimal_places=2, max_digits=10)),
                ('charging_time', models.DecimalField(decimal_places=2, max_digits=5)),
                ('range_km', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ChargingStation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_name', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('charging_type', models.CharField(choices=[('DC', 'DC'), ('AC', 'AC'), ('Wireless', 'Wireless')], max_length=50)),
                ('power_kw', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=255)),
                ('address', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_type', models.CharField(max_length=255)),
                ('service_date', models.DateField()),
                ('service_cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='uzcars_app.car')),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sale_date', models.DateField()),
                ('sale_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='uzcars_app.car')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchases', to='uzcars_app.owner')),
            ],
        ),
    ]
