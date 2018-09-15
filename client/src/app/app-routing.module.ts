import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {AboutPageComponent} from "./about-page/about-page.component";
import {ContactsPageComponent} from "./contacts-page/contacts-page.component";
import {CarsPageComponent} from "./cars-page/cars-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {CategoryFormComponent} from "./categories-page/category-form/category-form.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children:
      [
        {path: 'login', component: LoginPageComponent},
        {path: 'register', component: RegisterPageComponent}
      ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children:
      [
        {path: 'overview', component: OverviewPageComponent},
        {path: 'aboutus', component: AboutPageComponent},
        {path: 'cars', component: CarsPageComponent},
        {path: 'categories', component: CategoriesPageComponent},
        {path: 'categories/new', component: CategoryFormComponent},
        {path: 'categories/:id', component: CategoryFormComponent},
        {path: 'contacts', component: ContactsPageComponent}
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
