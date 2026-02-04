import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addNewUser(payload: IUser): Observable<IUserResponse> {
    return this.http.post<IUserResponse>('/api/ZoomCar/AddNewUser', payload);
  }

  loginUser(payload: IUser): Observable<IUserResponse> {
    return this.http.post<IUserResponse>('/api/ZoomCar/Login', payload);
  }
}
