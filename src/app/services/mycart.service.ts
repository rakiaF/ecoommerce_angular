import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { shopping } from '../interfaces/shopping.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MycartService {
  private dbPath = 'users/${this.as.userId}/cart';

  shopRef: AngularFirestoreCollection<shopping>;

  constructor(private fs:AngularFirestore,private as:AuthService) {
    this.shopRef = fs.collection(this.dbPath)
   }
  
  getCart(){
    return this.fs.collection('users/${this.as.userId}/cart').snapshotChanges()

  }

  save(id: string, amount: number): Promise<void> {
    return this.shopRef.doc(id).update({amount});
  }

  delete(id:string):Promise<void>{
    console.log(this.as.userId)
    return this.shopRef.doc(id).delete();
  }

}
