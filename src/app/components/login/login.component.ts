import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as:AuthService, private router :Router) { }

  ngOnInit(): void {
  }
  login(form:any){
    let data = form.value
    this.as.login(data.email,data.password).then(() => {
      this.router.navigate(['/'])
   }).catch(error => console.log('f',error))
  }

}
