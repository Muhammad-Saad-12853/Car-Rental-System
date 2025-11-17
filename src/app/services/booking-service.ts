import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http:HttpClient){

  }
  getAllBooking(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings")
  }
  getAllCars(){
        return this.http.get("https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars")
  }

  saveBooking(obj:any) {
      console.log('Sending booking data:', obj);
      return this.http.post("https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewBooking",obj)
    }

  deleteBooking(id: any) {
    return this.http.delete(`https://freeapi.miniprojectideas.com/api/CarRentalApp/DeletBookingById?id=${id}`);
  }

}
