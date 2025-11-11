import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj:any={
    userName:"",
    password:""
  }
  router = inject(Router)
  onLogin(){
    if(this.loginObj.userName=="saad" && this.loginObj.password==1234){
      this.router.navigateByUrl("/dashboard")
    }
    else{
      alert("Wrong Credentials")
    }
  }

}
