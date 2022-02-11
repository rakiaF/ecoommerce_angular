import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Good } from '../interfaces/good.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private fs:AngularFirestore, private storage:AngularFireStorage) { 

  }
  
  getAllGoods(){
    return this.fs.collection('goods').valueChanges();
  }
  AddNewGood(name:string,price:number,category:string,image:File){
    let ref = this.storage.ref('goods/'+image.name)
    ref.put(image).then(data => {
      ref.getDownloadURL().subscribe(photoUrl=>{
        this.fs.collection('goods').add({
          name,
          price,
          category,
          photoUrl
        })
      })
    })
  }
}
