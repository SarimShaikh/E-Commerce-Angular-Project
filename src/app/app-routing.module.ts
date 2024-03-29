import { ReturnItemsComponent } from './return-items/return-items.component';
import { OrdersComponent } from './orders/orders.component';
import { RentalItemsComponent } from './rental-items/rental-items.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsWebComponent } from './products-web/products-web.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CompanyComponent } from './company/company.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register-user/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'cart', component: CartComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'viewproducts', component: ProductsWebComponent },
  { path: 'productinventory', component: ProductInventoryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'rentalitems', component: RentalItemsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'returnitems', component: ReturnItemsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
