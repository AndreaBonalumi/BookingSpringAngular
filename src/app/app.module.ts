import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ManageCarComponent } from './pages/manage-car/manage-car.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyButtonComponent } from "./components/my-button/my-button.component";
import { MyTableComponent } from "./components/my-table/my-table.component";
import { ToolPaginationComponent } from "./components/tool-pagination/tool-pagination.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { OrdinamentoPipe } from "./pipes/ordinamento.pipe";
import { PaginationPipe } from "./pipes/pagination.pipe";
import {FormsModule} from "@angular/forms";
import { CarsComponent } from './pages/cars/cars.component';
import { UserBookingComponent } from './pages/user-booking/user-booking.component';
import { LoginComponent } from './pages/login/login.component';
import {RouterLink, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ManageBookingComponent,
    ManageUserComponent,
    ManageCarComponent,
    HomeComponent,
    ProfileComponent,
    MyButtonComponent,
    MyTableComponent,
    ToolPaginationComponent,
    FilterPipe,
    OrdinamentoPipe,
    PaginationPipe,
    CarsComponent,
    UserBookingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
