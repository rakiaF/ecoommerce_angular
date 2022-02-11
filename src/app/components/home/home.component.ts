import { Component, OnDestroy, OnInit } from '@angular/core';
import { Good } from '../../interfaces/good.interface'
import { GoodsService } from 'src/app/services/goods.service';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  goods: Good[] | any;
  filteredgoods: any[] = []
  goodObservable: Subscription | any
  add: number = -1
  categories$: Observable<any[]>;
  category = '';

  constructor(private gs: GoodsService,
    private cs: CartService,
    private catServ: CategoriesService,
    private route: ActivatedRoute,
    private router: Router) {
    /* Subscribing the route events */
    this.router.events.subscribe((e: any) => {
      /* This will make sure that our event is called only once */
      if (e["routerEvent"] != undefined) {
        // You flow/sequences to load page
      }
    });
  }

  ngOnInit(): void {
    this.categories$ = this.catServ.getCategories();
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      console.log('cat', this.category)

    });

    this.goodObservable = this.gs.getAllGoods().subscribe(data => {
      this.goods = data
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        console.log('cat', this.category)


        this.filteredgoods = (this.category) ?
          this.goods.filter(p => {
            console.log('fff.', p.category)
            return p.category === this.category
          }) : this.goods;
        console.log(this.filteredgoods); //


        console.log('g', this.goods)
      })
    })
    return this.retrieveGategories()

  }
  retrieveGategories(): any {
    this.categories$ = this.catServ.getCategories()
  }
  ngOnDestroy(): void {
    this.goodObservable.unsubscribe()

  }
  buy(amount: string) {
    let selectedGood = this.goods[this.add]
    let data = {
      name: selectedGood.name,
      amount: +amount,
      price: selectedGood.price
    }
    this.cs.addToCart(data).then(() => this.add = -1)
  }
  addTocart(index: number): void {
    this.add = +index
  }
}
