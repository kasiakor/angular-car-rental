import { Component, inject, OnInit } from '@angular/core';
import { IBookingByCustomerId } from '../../interfaces/booking.interface';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-booking',
  imports: [],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css',
})
export class MyBookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  private userService = inject(UserService);

  customerId!: number;
  myBookingList: IBookingByCustomerId[] = [];

  ngOnInit(): void {
    this.customerId = this.userService.getCustomerIdFromLocalStorage();
    this.loadBookingsByCustomerId();
  }

  loadBookingsByCustomerId() {
    this.bookingService.getBookingsByCustomerId(this.customerId).subscribe({
      next: (res) => {
        this.myBookingList = res.data;
        console.log('Bookings by Customer ID:', res.data);
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      },
    });
  }
}
