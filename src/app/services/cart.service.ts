import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Good } from '../interfaces/good.interface';
import { shopping } from '../interfaces/shopping.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dbPath = 'users/${this.as.userId}/cart';
  shopRef: AngularFirestoreCollection<shopping>;
  public cartItemList : any =[]
  constructor(private fs:AngularFirestore,private as:AuthService) {
    this.shopRef = fs.collection(this.dbPath)
   }  
   addToCart(data:Good){
    return this.shopRef.add(data)
  }
  getCart(){
    return this.shopRef.snapshotChanges()

  }

  save(id: string, amount: number): Promise<void> {
    return this.shopRef.doc(id).update({amount});
  }

  delete(id:string):Promise<void>{
    console.log(this.as.userId)
    return this.shopRef.doc(id).delete();
  }
  getTotalPrice(){
    let grandtotal=0;

  }

}

  