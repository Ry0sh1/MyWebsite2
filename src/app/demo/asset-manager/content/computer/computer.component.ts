import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
import {FormControl, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {Owner} from "../../model/owner/owner";
import {OwnerService} from "../../model/owner/owner.service";
import {map, Observable, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";

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
  public computer!: Computer;
  public statusOptions: Status[] = Object.values(Status);
  public operationalStatusOptions: OperationalStatus[] = Object.values(OperationalStatus);
  public operationalImpactOptions: OperationImpact[] = Object.values(OperationImpact);
  public propertyOptions: Property[] = Object.values(Property);
  public accountStatusOptions: AccountStatus[] = Object.values(AccountStatus);
  public operationSystemOptions: OperationSystem[] = Object.values(OperationSystem)

  public filteredOptions!: Observable<Owner[]>;
  public owners: Owner[];
  public ownerControl = new FormControl<string | Owner>("");

  public yearOfManufacture: Date|null = new Date();
  public endOfOperation: Date|null = new Date();

  public statusControl = new FormControl<Status>(Status.UNKNOWN);
  public operationalStatusControl = new FormControl<OperationalStatus>(OperationalStatus.UNKNOWN);
  public operationalImpactControl = new FormControl<OperationImpact>(OperationImpact.PERSON);
  public propertyControl = new FormControl<Property>(Property.UNKNOWN);
  public accountStatusControl = new FormControl<AccountStatus>(AccountStatus.ACTIVE);
  public operationSystemControl = new FormControl<OperationSystem>(OperationSystem.WINDOWS11);

  constructor(private route: ActivatedRoute,
              private ownerService: OwnerService,
              private computerService: ComputerService,
              private router: Router) {
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
          this.computer.id = +params['id'];
          this.fillTemplate();
        }))
    });
  }

  public fillTemplate(){
    (document.getElementById('headComputerName') as HTMLHeadingElement).innerText = "Computer Name: " + this.computer.name;

    this.ownerControl.setValue(this.computer.owner);
    this.statusControl.setValue(this.computer.status);
    this.operationalStatusControl.setValue(this.computer.operational_status);
    this.operationalImpactControl.setValue(this.computer.operational_impact);
    this.propertyControl.setValue(this.computer.property);
    this.accountStatusControl.setValue(this.computer.account_status);
    this.operationSystemControl.setValue(this.computer.operation_system);

    this.yearOfManufacture = new Date(this.computer.end_of_operation);
    this.endOfOperation = new Date(this.computer.year_of_manufacture);
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

  public onEditComputer(form: NgForm){
    form.value.id = this.computer.id;
    form.value.status = this.statusControl.value;
    form.value.operational_status = this.operationalStatusControl.value;
    form.value.operational_impact = this.operationalImpactControl.value;
    form.value.property = this.propertyControl.value;
    form.value.account_status = this.accountStatusControl.value;
    form.value.operation_system = this.operationSystemControl.value;
    form.value.owner = this.ownerControl.value;

    form.value.end_of_operation = this.endOfOperation;
    form.value.year_of_manufacture = this.yearOfManufacture;

    this.computerService.updateComputer(form.value).subscribe(
      (response: Computer) => {
        console.log(response);
      },(error: HttpErrorResponse) => {
        alert(error.message + error.name + error.statusText + error.headers);
      })
  }

  public onEndOfOperationChange(event: MatDatepickerInputEvent<Date>): void {
    this.endOfOperation = event.value;
  }
  public onYearOfManufactureChange(event: MatDatepickerInputEvent<Date>): void {
    this.yearOfManufacture = event.value;
  }

  public goBack() {
    this.router.navigate(['asset-manager/assets'])
  }

}
