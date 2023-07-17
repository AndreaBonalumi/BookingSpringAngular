import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {CarsComponent} from "./pages/cars/cars.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ManageUserComponent} from "./pages/manage-user/manage-user.component";
import {ManageCarComponent} from "./pages/manage-car/manage-car.component";
import {ManageBookingComponent} from "./pages/manage-booking/manage-booking.component";
import {UserBookingComponent} from "./pages/user-booking/user-booking.component";
import {LoginComponent} from "./pages/login/login.component";

let routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'manageUser/:id', component: ManageUserComponent},
  {path: 'manageUser', component: ManageUserComponent},
  {path: 'manageCar/:id', component: ManageCarComponent},
  {path: 'manageCar', component: ManageCarComponent},
  {path: ':idUser/manageBooking/:idBooking', component: ManageBookingComponent},
  {path: ':idUser/manageBooking', component: ManageBookingComponent},
  {path: 'bookings/:id', component: UserBookingComponent},
  {path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
