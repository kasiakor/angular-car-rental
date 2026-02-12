import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICarById } from '../../interfaces/car.interface';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-booking',
  imports: [DatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  carId!: number;
  selectedCar?: ICarById;

  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('carId');

    if (id) {
      this.carId = Number(id);
      console.log('carId:', this.carId);
    }
    this.loadCarById();
  }

  loadCarById() {
    this.carService.getCarByCarId(this.carId).subscribe({
      next: (res) => {
        this.selectedCar = res.data;
        console.log('this.selectedCar', res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
