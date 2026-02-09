import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarResponse } from '../interfaces/car.interface';
import { ILocationResponse } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getAllCarsByLocationId(locationId: number) {
    return this.http.get<ICarResponse>(
      '/api/ZoomCar/GetAllCarsByLocation?id=' + locationId,
    );
  }

  getAllLocations() {
    return this.http.get<ILocationResponse>('/api/ZoomCar/GetAllLocations');
  }
}
