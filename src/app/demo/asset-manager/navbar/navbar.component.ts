import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {NgEventBus} from "ng-event-bus";
import {MatMenuModule} from "@angular/material/menu";
import {SearchService} from "../model/search-service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-asset-manager-navbar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private eventBus: NgEventBus, private searchService:SearchService) {}

  moreOptionsClick() {
    this.eventBus.cast('appBarMoreOptionsButtonClickEvent');
  }

  addAssetClick() {
    this.eventBus.cast('appBarAddAssetButtonClickedEvent');
  }

  public search(key: string): void {
    this.searchService.setSearchTerm(key);
  }

}
