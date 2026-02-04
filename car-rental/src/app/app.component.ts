import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IUser, IUserResponse } from './interfaces/user.interface';
import { UserService } from './services/user.service';

declare const bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  http = inject(HttpClient);
  userService = inject(UserService);

  title = 'car-rental';

  user: IUser = {
    name: '',
    userRole: 'user',
    emailId: '',
    mobileNo: '',
    password: '',
  };

  showPassword = false;

  authMode = signal<'login' | 'register' | null>(null);

  @ViewChild('authModal') modalEl!: ElementRef<HTMLElement>;
  private modal!: any;

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.modalEl.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }

  openAuthModal(): void {
    this.authMode.set('login');
    this.modal.show();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  openLogin() {
    this.authMode.set('login');
  }

  openRegister() {
    this.authMode.set('register');
  }

  onRegister() {
    // payload to backend (exclude backend-generated fields - userId)
    const payload: Omit<IUser, 'userId'> = {
      name: this.user.name,
      userRole: 'CarOwner',
      emailId: this.user.emailId,
      mobileNo: this.user.mobileNo,
      password: this.user.password,
      createdOn: new Date().toISOString(),
    };
    console.log('payload', payload);
    this.userService.addNewUser(payload).subscribe({
      next: (res: IUserResponse) => {
        console.log('User created:', res);
      },
      error: (err) => {
        console.error('Create user failed:', err);
      },
    });
  }

  onLogin() {
    const loginObj: Omit<IUser, 'userId'> = {
      name: 'asdas',
      userRole: 'CarOwner',
      emailId: this.user.emailId,
      mobileNo: '1122331122',
      password: this.user.password,
      createdOn: new Date().toISOString(),
    };
    console.log('loginObj', loginObj);
    this.userService.loginUser(loginObj).subscribe({
      next: (res: IUserResponse) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        console.log('User login succesful :', res);
      },
      error: (err) => {
        console.error('Login user failed:', err);
      },
    });
  }
}
