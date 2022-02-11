import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { shopping } from 'src/app/interfaces/shopping.interface';
import { MycartService } from 'src/app/services/mycart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {


  mycart :shopping[] = [] 

  
  constructor(private mcs:MycartService) { }

  ngOnInit(): void {
    this.mcs.getCart().subscribe(cart =>{
      this.mycart = cart.map(shopping => {
        return{
          id:shopping.payload.doc.id,
          ...shopping.payload.doc.data() as {},
        }
      })
      console.log(this.mycart)
    })    
  }
  delete(index:any){
    return this.mcs.delete(this.mycart[index].id)
   }
   save(index:any){
    this.mcs.save(this.mycart[index].id,this.mycart[index].amount)
  }
  
}
