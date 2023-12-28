import { Component } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from "@angular/material/grid-list";
import {ComputerService} from "../../model/computer/computer.service";
import {Computer} from "../../model/computer/computer";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-asset-manager-navbar-add',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  templateUrl: './asset-manager-navbar-add.component.html',
  styleUrl: './asset-manager-navbar-add.component.css'
})
export class AssetManagerNavbarAddComponent {

  constructor(private computerService: ComputerService) { }

  //TODO: IMPLEMENT OWNER DROPDOWN IN COMPUTER OWNER SELECTION

  public onAddComputer(addComputerForm: NgForm) {
    this.computerService.addComputer(addComputerForm.value).subscribe(
      (response: Computer) => {
        console.log(response)
      },
    (error: HttpErrorResponse) => {
        alert(error.message)
        }
    );
  }

}
