import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-asset-manager-navbar-add',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  templateUrl: './asset-manager-navbar-add.component.html',
  styleUrl: './asset-manager-navbar-add.component.css'
})
export class AssetManagerNavbarAddComponent {

}
