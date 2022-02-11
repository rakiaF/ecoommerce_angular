import { Component, OnInit } from '@angular/core';
import { shopping } from 'src/app/interfaces/shopping.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart :shopping[] = [] 
  constructor(private cs:CartService) { }

  ngOnInit(): void {
    this.cs.getCart().subscribe(cart =>{
      this.cart = cart.map(shopping => {
        return{
          id:shopping.payload.doc.id,
          ...shopping.payload.doc.data() as {},
        }
      })
      console.log(this.cart)
    })
  }
  delete(index:any){
   return this.cs.delete(this.cart[index].id)
  }
  save(index:any){
    this.cs.save(this.cart[index].id,this.cart[index].amount)
  }
}
