import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  bookingsrv = inject(BookingService);
  carList: any[] = [];
  bookingList:any[]=[]
  bookingForm: FormGroup = new FormGroup({
    customerName: new FormControl("", [Validators.required]),
    customerCity: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    bookingId: new FormControl("", [Validators.required]),
    carId: new FormControl("", [Validators.required]),
    bookingDate: new FormControl("", [Validators.required]),
    discount: new FormControl("", [Validators.required]),
    totalBillAmount: new FormControl("", [Validators.required])
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
  getBookings(){
    this.bookingsrv.getAllBooking().subscribe((res:any)=>{
      this.bookingList=res.data
    })
  }

  onSave(){
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      this.bookingsrv.saveBooking(formValue).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Booking Done");
            this.bookingForm.reset();
            this.getBookings();
          } else {
            alert(res.message || "Booking failed");
          }
        },
        error: (err: any) => {
          console.error('Booking error:', err);
          if (err.error) {
            const errors = err.error;
            let errorMessage = "Validation errors:\n";
            for (const field in errors) {
              errorMessage += `${field}: ${errors[field].join(', ')}\n`;
            }
            alert(errorMessage);
          } else {
            alert("An error occurred while saving the booking.");
          }
        }
      });
    } else {
      alert("Please fill all required fields correctly.");
    }
  }

  DeleteBooking(bookingId: any) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingsrv.deleteBooking(bookingId).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Booking deleted successfully");
            this.getBookings();
          } else {
            alert(res.message || "Deletion failed");
          }
        },
        error: (err: any) => {
          console.error('Delete error:', err);
          alert("An error occurred while deleting the booking.");
        }
      });
    }
  }
}
