import { AuthService } from 'src/app/services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnimationBuilder, transition, trigger, style, animate, state, keyframes, query, stagger, sequence, group, AnimationMetadata, AnimationPlayer } from '@angular/animations';

import { Subscription,throttleTime,fromEvent } from 'rxjs';
import { badgeAnimation, circleAnimation } from '../navbar/animations/animation';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isOpen:boolean=false
  isUser:boolean=false

  constructor(private as : AuthService,private scat: CategoriesService,private cartService:CartService) { }
  
  @ViewChild('svg', { read: ElementRef }) public svg: any;
  @ViewChild('wrapper', { read: ElementRef }) public wrapper: any;
  public totalItem:Number=0;
  
  ngOnInit(): void {
    this.as.user.subscribe( user => {
      if (user){
        this.isUser = true;
        this.as.userId = user.uid
      } 
      else{
        this.isUser = false
        this.as.userId = ''
      } 
      this.cartService.getCart().subscribe(res =>{
        this.totalItem = res.length;
      })
    })

}
  
  toggleNavBar(){
    this.isOpen = !this.isOpen
  }
  logout(){
    this.as.logout().then(() => console.log('out'))
  }


  public items: number = 0;
  private clickSubscription: Subscription;

  
  
}
