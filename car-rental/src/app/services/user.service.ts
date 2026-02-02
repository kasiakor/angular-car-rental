import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IUserRegister,
  IUserRegisterResponse,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addNewUser(payload: IUserRegister): Observable<IUserRegisterResponse> {
    return this.http.post<IUserRegisterResponse>(
      'https://freeapi.miniprojectideas.com/api/ZoomCar/AddNewUser',
      payload,
    );
  }
}
