import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerService} from "../../model/owner/owner.service";
import {Computer} from "../../model/computer/computer";
import {ComputerService} from "../../model/computer/computer.service";
import {Owner} from "../../model/owner/owner";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-asset-manager-owner',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit{

  public owner!:Owner;

  constructor(private route:ActivatedRoute,
              private ownerService: OwnerService,
              private computerService: ComputerService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ownerService.getOwnerById(+params['id']).subscribe(
        (response=> {
          this.owner = response;
          this.owner.id = +params['id'];
      }))
    })
  }

  public onEditOwner(form: NgForm){
    form.value.id = this.owner.id;
    this.ownerService.updateOwner(form.value).subscribe(
      (response)=> {
        console.log(response);
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goBack(){
    this.router.navigate(['asset-manager/base-data'])
  }

}
