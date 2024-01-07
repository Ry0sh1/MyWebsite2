import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {AssetManagerComponent} from "./demo/asset-manager/asset-manager.component";
import {AssetManagerHomeComponent} from "./demo/asset-manager/content/home/home.component";

import {
  AssetsComponent
} from "./demo/asset-manager/content/assets/assets.component";
import {ComputerComponent} from "./demo/asset-manager/content/computer/computer.component";
import {OwnerComponent} from "./demo/asset-manager/content/owner/owner.component";
import {BaseDataComponent} from "./demo/asset-manager/content/base-data/base-data.component";
import {TutorialComponent} from "./demo/asset-manager/content/tutorial/tutorial.component";

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
        component: AssetsComponent,
      },
      {
        path:'base-data',
        component: BaseDataComponent,
      },
      {
        path: 'computer/:id',
        component: ComputerComponent,
      },
      {
        path:'help',
        component: TutorialComponent
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
