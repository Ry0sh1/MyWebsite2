import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgComponentOutlet} from "@angular/common";
import {AssetManagerHomeComponent} from "./asset-manager-home/asset-manager-home.component";
import {AssetManagerTestComponent} from "./asset-manager-test/asset-manager-test.component";
import {AssetManagerNavbarComponent} from "./asset-manager-navbar/asset-manager-navbar.component";
import {
  AssetManagerNavbarOptionsComponent
} from "./asset-manager-navbar/asset-manager-navbar-options/asset-manager-navbar-options.component";

@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgComponentOutlet,
    RouterLinkActive,
    AssetManagerHomeComponent,
    AssetManagerTestComponent,
    AssetManagerNavbarComponent,
    AssetManagerNavbarOptionsComponent,
  ],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.css'
})
export class AssetManagerComponent {

}
