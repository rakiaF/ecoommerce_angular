import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string = ' ';
  constructor(private as:AuthService, private us:UserService, private router :Router) { }
  signup(form:any){
    let data:User = form.value
    this.as.signup(data.email, data.password)
    .then(reault => {
       this.errorMessage=''
       this.us.AddNewUser(reault.user?.uid, data.name,data.adress ).then(() => {
          this.router.navigate(['/'])
       }).catch(error => console.log('f',error))
    })
    .catch(error => {
      console.log('z',error)          
      
      this.errorMessage = error.message 
    })
  }
  ngOnInit(): void {
  }

}
