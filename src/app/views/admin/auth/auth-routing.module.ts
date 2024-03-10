import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddEmployeeComponent } from './auth/add-employee/add-employee/add-employee.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    
  },
  {
    path: 'add', component: AddEmployeeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
