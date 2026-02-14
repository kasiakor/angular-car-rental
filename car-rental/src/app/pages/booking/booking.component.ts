import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ICarById } from '../../interfaces/car.interface';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../services/car.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-booking',
  imports: [DatePipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  carId!: number;
  selectedCar?: ICarById;
  selectedFromLocationId: number = 0;
  selectedToLocationId: number = 0;

  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);
  private locationService = inject(LocationService);
  private bookingService = inject(BookingService);

  private getCarIdFromRoute() {
    const id = this.activatedRoute.snapshot.paramMap.get('carId');
    return id ? Number(id) : null;
  }

  private getCustomerIdFromLocalStorage(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return Number(user.userId) || 0;
  }

  locations$ = this.locationService
    .getAllLocations()
    .pipe(map((res) => res.data));

  bookingForm: FormGroup = new FormGroup({
    bookingId: new FormControl(0),
    customerId: new FormControl(0),
    carId: new FormControl(0),
    invoiceNo: new FormControl(''),
    isComplete: new FormControl(false),
    fromLocationId: new FormControl(null, Validators.required),
    toLocationId: new FormControl(null, Validators.required),
    travelDate: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    pickupAddress: new FormControl('', Validators.required),
    alternateContactNo: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('carId');

    if (id) {
      this.carId = Number(id);
      console.log('carId:', this.carId);
    }
    this.loadCarById();
    console.log('locations$', this.locations$);

    const customerId = this.getCustomerIdFromLocalStorage();
    const carId = this.getCarIdFromRoute();

    this.bookingForm.patchValue({
      customerId,
      carId,
    });
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

  onBook() {
    if (this.bookingForm.invalid) return;

    const bookingData = this.bookingForm.value;

    this.bookingService.createNewBooking(bookingData).subscribe({
      next: (res) => {
        console.log('Booking success:', res);
      },
      error: (err) => {
        console.error('Booking failed:', err);
      },
    });
  }
}
