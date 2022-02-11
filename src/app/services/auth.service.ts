import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User|any>;
  userId:string=''
  
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.user

    
   }
  signup(email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }
  login(email:string,password:string) {
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }
  logout() {
    return this.afAuth.signOut();
  }
}
