import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  AccountStatus,
  Computer,
  OperationalStatus,
  OperationImpact,
  OperationSystem,
  Property,
  Status
} from "../../model/computer/computer";
import {ComputerService} from "../../model/computer/computer.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {Owner} from "../../model/owner/owner";
import {OwnerService} from "../../model/owner/owner.service";
import {map, Observable, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-asset-manager-computer',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    AsyncPipe,
    NgForOf,
    MatAutocompleteModule,
    MatDatepickerModule
  ],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css'
})
export class ComputerComponent implements OnInit{
  computer!: Computer;
  public statusOptions: Status[] = Object.values(Status);
  public operationalStatusOptions: OperationalStatus[] = Object.values(OperationalStatus);
  public operationalImpactOptions: OperationImpact[] = Object.values(OperationImpact);
  public propertyOptions: Property[] = Object.values(Property);
  public accountStatusOptions: AccountStatus[] = Object.values(AccountStatus);
  public operationSystemOptions: OperationSystem[] = Object.values(OperationSystem)
  public selectedStatus: Status = Status.UNKNOWN;
  public selectedOperationalStatus: OperationalStatus = OperationalStatus.UNKNOWN;
  public selectedOperationalImpact: OperationImpact = OperationImpact.PERSON;
  public selectedProperty: Property = Property.UNKNOWN;
  public selectedAccountStatus: AccountStatus = AccountStatus.ACTIVE;
  public selectedOperationSystem: OperationSystem = OperationSystem.WINDOWS11;

  public filteredOptions!: Observable<Owner[]>;
  public owners: Owner[];
  public ownerControl = new FormControl<string | Owner>("");

  public yearOfManufacture: Date = new Date();
  public endOfOperation: Date = new Date();

  constructor(private route: ActivatedRoute,
              private ownerService: OwnerService,
              private computerService: ComputerService) {
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
    this.route.params.subscribe(params => {
      this.computerService.getComputerById(+params['id']).subscribe(
        (response => {
          this.computer = response;
          this.selectedStatus = this.computer.status;
          this.selectedOperationalStatus = this.computer.operational_status;
          this.selectedOperationalImpact = this.computer.operational_impact;
          this.selectedProperty = this.computer.property;
          this.selectedAccountStatus = this.computer.account_status;
          this.ownerControl.setValue(this.computer.owner);
          this.selectedOperationSystem = this.computer.operation_system;
          this.yearOfManufacture = new Date(this.computer.end_of_operation);
          this.endOfOperation = new Date(this.computer.year_of_manufacture);
        }))
    });
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

}
