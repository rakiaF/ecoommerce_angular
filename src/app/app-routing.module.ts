import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { GoodsComponent } from './components/goods/goods.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'cart', component:CartComponent, canActivate:[AuthGuard]},
  {path:'goods', component:GoodsComponent},
  {path:'mycart',component:MycartComponent}

];
/* Applicable configuration for routes */
const optionrouting: ExtraOptions = {
  // your existing option
  onSameUrlNavigation: 'reload'
  // you existing option
  };
@NgModule({
  imports: [RouterModule.forRoot(routes,optionrouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
