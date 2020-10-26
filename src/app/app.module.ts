import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register-user/register.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ProfileComponent } from './profile/profile.component'
@NgModule({
  declarations: [
    AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
