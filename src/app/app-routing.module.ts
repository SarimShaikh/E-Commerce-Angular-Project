import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register-user/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
