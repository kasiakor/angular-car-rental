import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarByIdResponse } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getCarByCarId(carId: number) {
    return this.http.get<ICarByIdResponse>(
      '/api/ZoomCar/GetCarById?id=' + carId,
    );
  }
}
