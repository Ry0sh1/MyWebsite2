import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-asset-manager-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './asset-manager-navbar.component.html',
  styleUrl: './asset-manager-navbar.component.css'
})
export class AssetManagerNavbarComponent {

}
