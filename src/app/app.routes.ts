import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {AssetManagerComponent} from "./demo/asset-manager/asset-manager.component";
import {AssetManagerHomeComponent} from "./demo/asset-manager/home/home.component";

import {
  ComputerComponent
} from "./demo/asset-manager/computer/computer.component";

export const routes: Routes = [
  {
    path: 'asset-manager',
    title: 'Asset Manager Demo',
    component:AssetManagerComponent,
    children: [
      {
        path:'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path:'assets',
        component: ComputerComponent,
      },
      {
        path: '', component:AssetManagerHomeComponent,
      },
    ],
  },
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];
