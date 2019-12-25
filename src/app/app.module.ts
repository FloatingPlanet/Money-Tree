// Other people's stuff ---- dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
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
  MatPaginatorModule
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
// Our stuff ---- ❤❤❤
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/login/auth.service';
import { UserService } from './services/user/user.service';
import { FlashMessageService } from './services/flashMessage/flash-message.service';
import { ProductService } from './services/product/product.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProfileComponent,
    OrderListComponent,
    ProductCardComponent,
    NavBarComponent,
    LoginPageComponent,
    ShoppingCartComponent,
    CheckoutPageComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    ProductItemComponent,
    OrderSummaryComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    // material design stuff
    NgbModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
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
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    UserService,
    FlashMessageService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
