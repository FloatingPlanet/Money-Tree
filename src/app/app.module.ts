// Other people's stuff ---- dependencies
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Our stuff
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './pages/main-page/main-page.component';

import {ProductCardComponent} from './components/product-card/product-card.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {CheckoutPageComponent} from './pages/checkout-page/checkout-page.component';
import {NoAccessComponent} from './pages/no-access/no-access.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {environment} from 'src/environments/environment';
import {FlashMessageService} from './services/flashMessage/flash-message.service';
import {ProductService} from './services/product/product.service';
import {SignupPageComponent} from './pages/signup-page/signup-page.component';
import {ProductItemComponent} from './components/product-item/product-item.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminOrdersComponent} from './pages/admin-page/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './pages/admin-page/admin-products/admin-products.component';
import {CategoryFormComponent} from './pages/admin-page/admin-products/category-form/category-form.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ProductFormComponent} from './pages/admin-page/admin-products/product-form/product-form.component';
import {ModifyProductComponent} from './components/modify-product/modify-product.component';
import {CategoryService} from './services/category/category.service';
import {ProductInfoComponent} from './components/product-info/product-info.component';
import {CouponsService} from './services/coupons/coupons.service';
import {FlexModule} from '@angular/flex-layout';
import {AdminCouponsComponent} from './pages/admin-page/admin-coupons/admin-coupons.component';
import {CouponFormComponent} from './pages/admin-page/admin-coupons/coupon-form/coupon-form.component';
import {CartService} from './services/cart/cart.service';
import {UserPageComponent} from './user/user-page/user-page.component';
import {UserOrdersComponent} from './user/user-orders/user-orders.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {MatBadgeModule} from '@angular/material/badge';
import {CheckoutFormComponent} from './forms/checkout-form/checkout-form.component';
import {ProductQuickLookComponent} from './components/product-quick-look/product-quick-look.component';
import {HttpClientModule} from '@angular/common/http';
import {AddressService} from './services/address/address.service';
import { MidBannerComponent } from './components/mid-banner/mid-banner.component';
import { CategoriesBarComponent } from './components/categories-bar/categories-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryProductsPageComponent } from './pages/category-products-page/category-products-page.component';
import { CategoryProductsGridComponent } from './pages/category-products-page/category-products-grid/category-products-grid.component';
import { ScrollableDirective } from './scrollable/scrollable.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProductCardComponent,
    NavBarComponent,
    LoginPageComponent,
    ShoppingCartComponent,
    CheckoutPageComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    SignupPageComponent,
    ProductItemComponent,
    OrderSummaryComponent,
    AdminPageComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    CategoryFormComponent,
    ProductFormComponent,
    ModifyProductComponent,
    ProductInfoComponent,
    AdminCouponsComponent,
    CouponFormComponent,
    UserPageComponent,
    UserOrdersComponent,
    UserProfileComponent,
    CheckoutPageComponent,
    CheckoutFormComponent,
    ProductQuickLookComponent,
    MidBannerComponent,
    CategoriesBarComponent,
    LoadingSpinnerComponent,
    CategoryProductsPageComponent,
    CategoryProductsGridComponent,
    FooterComponent,
    ScrollableDirective,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserModule,
    ToastrModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    AngularFireAuthModule,
    // material design stuff
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FlexModule,
    MatBadgeModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    FlashMessageService,
    ProductService,
    CategoryService,
    CouponsService,
    CartService,
    AddressService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}

