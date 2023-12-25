import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgComponentOutlet} from "@angular/common";
import {AssetManagerHomeComponent} from "./asset-manager-home/asset-manager-home.component";
import {AssetManagerNavbarComponent} from "./asset-manager-navbar/asset-manager-navbar.component";
import {AssetManagerNavbarOptionsComponent} from "./asset-manager-navbar/asset-manager-navbar-options/asset-manager-navbar-options.component";
import {AssetManagerNavbarAddComponent} from "./asset-manager-navbar/asset-manager-navbar-add/asset-manager-navbar-add.component";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {NgEventBus} from "ng-event-bus";
@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgComponentOutlet,
    RouterLinkActive,
    AssetManagerHomeComponent,
    AssetManagerNavbarComponent,
    AssetManagerNavbarOptionsComponent,
    AssetManagerNavbarAddComponent,
    MatSidenavModule,
  ],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetManagerComponent {
  @ViewChild('sidenav') public matSidenav!: MatSidenav;
  @ViewChild('rightNav') public matRightSideNav!: MatSidenav;

  constructor(private eventBus: NgEventBus) {

  }

  ngOnInit(){
    this.eventBus.on('appBarMoreOptionsButtonClickEvent').subscribe(() => this.matSidenav.toggle());
    this.eventBus.on('appBarAddAssetButtonClickedEvent').subscribe(() => this.matRightSideNav.toggle());
  }

}
