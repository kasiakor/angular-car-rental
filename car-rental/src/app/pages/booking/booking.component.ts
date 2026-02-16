import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ICarById } from '../../interfaces/car.interface';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../services/car.service';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-booking',
  imports: [DatePipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  carId!: number;
  selectedCar?: ICarById;

  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);
  private locationService = inject(LocationService);
  private bookingService = inject(BookingService);
  private userService = inject(UserService);
  private router = inject(Router);

  private getCarIdFromRoute() {
    const id = this.activatedRoute.snapshot.paramMap.get('carId');
    return id ? Number(id) : null;
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
    fromLocationId: new FormControl(0, Validators.required),
    toLocationId: new FormControl(0, Validators.required),
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

    const customerId = this.userService.getCustomerIdFromLocalStorage();
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
        if (res?.result === true) {
          console.log('Booking success:', res);
          this.router.navigate(['/my-bookings']);
          return;
        }

        // Backend returned a failure even though HTTP succeeded
        console.error('Booking failed:', res);
        alert(res?.message || 'Booking failed. Please try again.');
      },
      error: (err) => {
        console.error('Booking failed (HTTP error):', err);
        alert('Booking failed. Please try again.');
      },
    });
  }
}
