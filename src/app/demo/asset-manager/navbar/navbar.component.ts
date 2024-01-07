import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {NgEventBus} from "ng-event-bus";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-asset-manager-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private eventBus: NgEventBus) {}

  moreOptionsClick() {
    this.eventBus.cast('appBarMoreOptionsButtonClickEvent');
  }

  addAssetClick() {
    this.eventBus.cast('appBarAddAssetButtonClickedEvent');
  }

}
