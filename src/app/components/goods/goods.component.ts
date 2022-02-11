import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'

import { Good } from 'src/app/interfaces/good.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image') image:ElementRef
  categories$:Observable<any[]>;
 

  constructor(private gs:GoodsService,private catServ:CategoriesService) {
  
   }

  ngOnInit():any {
      return this.retrieveGategories()
  }
  retrieveGategories():any {
    this.categories$=this.catServ.getCategories()
  }
  addNewGood(form:NgForm){
    let name = (<Good >form.value).name,
        price= (<Good >form.value).price,
        category = (<Good >form.value).category,
        image =  (<HTMLInputElement>this.image.nativeElement).files[0]
    this.gs.AddNewGood(name,price,category,image)
  }
}
