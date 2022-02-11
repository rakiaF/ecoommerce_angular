import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs:AngularFirestore,private as:AuthService) { }

  AddNewUser(id:any,name:any,adress:any){
    return this.fs.doc('users/'+id).set({
      id,
      name,
      adress,
    })
  }

}
