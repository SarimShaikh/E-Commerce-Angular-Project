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
      ProductInventoryComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
