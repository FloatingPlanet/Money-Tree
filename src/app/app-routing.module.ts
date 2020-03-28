import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NoAccessComponent} from './pages/no-access/no-access.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SignupPageComponent} from './pages/signup-page/signup-page.component';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminOrdersComponent} from './pages/admin-page/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './pages/admin-page/admin-products/admin-products.component';
import {ModifyProductComponent} from './pages/admin-page/admin-products/modify-product/modify-product.component';
import {ProductInfoComponent} from './components/product-info/product-info.component';
import {AdminCouponsComponent} from './pages/admin-page/admin-coupons/admin-coupons.component';
import {CouponFormComponent} from './pages/admin-page/admin-coupons/coupon-form/coupon-form.component';
import {UserPageComponent} from './user/user-page/user-page.component';
import {UserOrdersComponent} from './user/user-orders/user-orders.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {CheckoutPageComponent} from './pages/checkout-page/checkout-page.component';
import {CategoryProductsContentComponent} from './pages/main-page/category-products-content/category-products-content.component';
// tslint:disable-next-line:max-line-length
import {CategoryProductsGridComponent} from './pages/main-page/category-products-content/category-products-grid/category-products-grid.component';
import {MainPageContentComponent} from './pages/main-page/main-page-content/main-page-content.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      {path: '', component: MainPageContentComponent},
      {
        path: 'category', component: CategoryProductsContentComponent,
        children: [
          {path: ':section', component: CategoryProductsGridComponent},
          {path: '**', component: PageNotFoundComponent},
        ]
      },
    ]
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutPageComponent},
  {path: 'no-access', component: NoAccessComponent},
  {path: 'info/:SKU', component: ProductInfoComponent},

  {
    path: 'admin', component: AdminPageComponent,
    children: [
      {path: '', redirectTo: 'orders', pathMatch: 'full'},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'products', component: AdminProductsComponent},
      {path: 'products/add', component: ModifyProductComponent},
      {path: 'products/modify/:SKU', component: ModifyProductComponent},
      {path: 'coupons', component: AdminCouponsComponent},
      {path: 'coupons/add', component: CouponFormComponent},
      {path: 'coupons/modify/:coupon', component: CouponFormComponent}
    ]
  },
  {
    path: 'user', component: UserPageComponent,
    children: [
      {path: '', redirectTo: 'orders', pathMatch: 'full'},
      {path: 'orders', component: UserOrdersComponent},
      {path: 'profile', component: UserProfileComponent},
    ]
  },
  {path: 'checkout', component: CheckoutPageComponent},
  {path: 'address', component: NoAccessComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
