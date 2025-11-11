import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Vehicles } from './components/vehicles/vehicles';
import { Booking } from './components/booking/booking';

export const routes: Routes = [
  {path:"", redirectTo:"login",pathMatch:"full"},
  {path:"login", component:Login},
  {path:"",component:Layout, 
    children:[
        {path:"dashboard",component:Dashboard},
        {path:"Vehicles",component:Vehicles},
        {path:"booking",component:Booking}
    ]}    
];
