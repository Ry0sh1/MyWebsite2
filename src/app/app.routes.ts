import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {DogDatabaseAppComponent} from "./demo/database/dog-database-app.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: 'dog-database-app', component:DogDatabaseAppComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];
