import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from "@angular/material/grid-list";
import {ComputerService} from "../../model/computer/computer.service";
import {Computer, Status} from "../../model/computer/computer";
import {HttpErrorResponse} from "@angular/common/http";
import {OwnerService} from "../../model/owner/owner.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Owner} from "../../model/owner/owner";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-asset-manager-navbar-add',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './asset-manager-navbar-add.component.html',
  styleUrl: './asset-manager-navbar-add.component.css'
})

export class AssetManagerNavbarAddComponent implements OnInit{
  public owners: Owner[];
  public ownerControl = new FormControl<string | Owner>('');
  public filteredOptions!: Observable<Owner[]>;

  public statusControl = new FormControl<Status>(Status.ACTIVE);
  public statusOptions: Status[] = Object.values(Status);

  constructor(private computerService: ComputerService, private ownerService: OwnerService) {
    this.owners = [];
  }

  ngOnInit(): void {
    this.getOwner();
    this.filteredOptions = this.ownerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const last_name = typeof value === 'string' ? value : value?.last_name;
        return last_name ? this._filter(last_name as string) : this.owners.slice();
      }),
    );
  }

  public displayOwner(owner: Owner): string{
    return owner && (owner.last_name + ", " + owner.first_name);
  }

  private _filter(name: string): Owner[] {
    const filterValue = name.toLowerCase();
    return this.owners.filter(option=>
      option.first_name.toLowerCase().includes(filterValue) ||
      option.last_name.toLowerCase().includes(filterValue) ||
      (option.last_name + ", " + option.first_name).toLowerCase().includes(filterValue));
  }

  public getOwner():void{
    this.ownerService.getOwner().subscribe(
      (response : Owner[]) => {
        this.owners = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddComputer(addComputerForm: NgForm) {
    addComputerForm.value.owner = this.ownerControl.value;
    addComputerForm.value.status = this.statusControl.value;
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
