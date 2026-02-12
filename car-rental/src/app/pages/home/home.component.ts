import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ILocation } from '../../interfaces/location.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  locations: ILocation[] = [];
  selectedLocationId!: number;

  private locationService = inject(LocationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getAllLocations().subscribe({
      next: (res) => {
        this.locations = res.data;
        console.log('getAllLocations', res.data); // ILocation[]
      },
      error: (err) => console.error(err),
    });
  }

  onLocationChange() {
    console.log('Selected locationId:', this.selectedLocationId);
  }

  onSearch() {
    if (!this.selectedLocationId) {
      alert('select the location');
      return;
    }
    this.router.navigate(['/search', this.selectedLocationId]);
  }
}
