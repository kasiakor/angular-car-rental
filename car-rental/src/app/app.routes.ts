import { Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { HomeComponent } from './pages/home/home.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'search/:locationId', component: SearchComponent },
  { path: 'booking/:carId', component: BookingComponent },
  { path: 'my-booking', component: MyBookingComponent },

  // optional: catch-all route
  { path: '**', redirectTo: 'home' },
];
