import { NavComponent } from './common/nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { RegisterComponent } from './register-user/register.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { PermissionsComponent } from './permissions/permissions.component';
import { CompanyComponent } from './company/company.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsWebComponent } from './products-web/products-web.component';
@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PermissionsComponent,
    CompanyComponent,
    CategoryComponent,
    ProductsComponent,
    ProductInventoryComponent,
    NavComponent,
      ProductsWebComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    NoopAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
