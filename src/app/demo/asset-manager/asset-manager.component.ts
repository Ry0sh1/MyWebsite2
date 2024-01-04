import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgComponentOutlet} from "@angular/common";
import {AssetManagerHomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {OptionsComponent} from "./navbar/options/options.component";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {NgEventBus} from "ng-event-bus";
import {
  ComputerInfoComponent
} from "./navbar/right-sidebar/computer-info/computer-info.component";
import {
  AddComponent
} from "./navbar/right-sidebar/add/add.component";
@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgComponentOutlet,
    RouterLinkActive,
    AssetManagerHomeComponent,
    NavbarComponent,
    OptionsComponent,
    AddComponent,
    MatSidenavModule,
    ComputerInfoComponent,
    AddComponent,
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
