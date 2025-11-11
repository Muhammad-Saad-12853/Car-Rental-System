import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  bookingsrv = inject(BookingService);
  carList: any[] = [];
  bookingList: any[] = []
  bookingForm: FormGroup = new FormGroup({
    customerName: new FormControl(""),
    customerCity: new FormControl(""),
    mobileNo: new FormControl(""),
    emailId: new FormControl(""),
    bookingId: new FormControl(0),
    carId: new FormControl(""),
    bookingDate: new FormControl(""),
    discount: new FormControl(""),
    totalBillAmount: new FormControl("")
  })
  ngOnInit(): void {
    this.getCarList();
    this.getBookings();
  }
  getCarList() {
    this.bookingsrv.getAllCars().subscribe((res: any) => {
      this.carList = res.data
    })
  }
  getBookings() {
    this.bookingsrv.getAllBooking().subscribe((res: any) => {
      this.bookingList = res.data
    })
  }

  onSave() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      console.log('Form Value:', formValue);
      this.bookingsrv.saveBooking(formValue).subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          if (res.result) {
            alert("Booking Done");
            this.bookingForm.reset();
            this.getBookings(); // Refresh the list
          } else {
            alert(res.message);
          }
        },
        error: (err: any) => {
          console.error('API Error:', err);
          alert('Error saving booking: ' + err.message);
        }
      });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
