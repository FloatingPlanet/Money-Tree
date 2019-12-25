import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AddProductComponent } from './components/add-product/add-product.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'admin/product', component: AddProductComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
