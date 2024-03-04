import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './authentication/component/signin/signin.component';
import { SignupComponent } from './authentication/component/signup/signup.component';
import { AuthModule } from './views/admin/auth/auth.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    CommonModule,
    AuthenticationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
