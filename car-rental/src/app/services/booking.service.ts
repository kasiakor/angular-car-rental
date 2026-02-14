import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBookingNew,
  IBookingNewResponse,
} from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  createNewBooking(bookingData: IBookingNew): Observable<IBookingNewResponse> {
    return this.http.post<IBookingNewResponse>(
      '/api/ZoomCar/createNewBooking',
      bookingData,
    );
  }
}
