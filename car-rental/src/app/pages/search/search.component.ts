import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICar } from '../../interfaces/car.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  locationId: number = 0;
  carsByLocation: ICar[] = [];
  isLoading = true;

  locationService = inject(LocationService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('locationId');

      if (!id) return;

      this.locationId = Number(id);
      this.loadCars();
    });
  }

  loadCars() {
    this.isLoading = true;

    this.locationService.getAllCarsByLocationId(this.locationId).subscribe({
      next: (res) => {
        this.carsByLocation = res.data;
        this.isLoading = false;
        console.log('this.carsByLocation', res.data);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
