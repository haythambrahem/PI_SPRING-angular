import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { SigninComponent } from './authentication/component/signin/signin.component';
import { SignupComponent } from './authentication/component/signup/signup.component';

const routes: Routes = [  
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  {

    path:'admin',component: AdminLayoutComponent, children:[
      {path:'' ,loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path:'dashboard',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path:'auth',loadChildren:()=>import('./views/admin/auth/auth.module').then(m=>m.AuthModule)},
      {path:'CRM',loadChildren:()=>import('./views/admin/crm/crm.module').then(m=>m.CRMModule)}
    ]
  },
  {
    path:'',component: FrontLayoutComponent,children:[
      {path:'',loadChildren:()=>import('./views/front/client/client.module').then(m=>m.ClientModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
