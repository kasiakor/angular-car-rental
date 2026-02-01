import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'car-rental';

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

  openLogin() {
    this.authMode.set('login');
  }

  openRegister() {
    this.authMode.set('register');
  }
}
