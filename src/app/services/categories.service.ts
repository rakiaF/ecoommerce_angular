import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private dbPath = '/categories';
  categoriesRef: AngularFirestoreCollection<Categorie>;

  constructor(private db:AngularFirestore) { 
    this.categoriesRef = db.collection(this.dbPath)

  }
  getCategories(){
    return this.categoriesRef.valueChanges();
  }
}
