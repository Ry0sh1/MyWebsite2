import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Computer, OperationalStatus, OperationImpact, Status} from "../../model/computer/computer";
import {ComputerService} from "../../model/computer/computer.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

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
    NgForOf
  ],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css'
})
export class ComputerComponent implements OnInit{

  computer!: Computer;
  public statusOptions: Status[] = Object.values(Status);
  public operationalStatusOptions: OperationalStatus[] = Object.values(OperationalStatus);
  public operationalImpactOptions: OperationImpact[] = Object.values(OperationImpact);
  public selectedStatus: Status = Status.UNKNOWN;
  public selectedOperationalStatus: OperationalStatus = OperationalStatus.UNKNOWN;
  public selectedOperationalImpact: OperationImpact = OperationImpact.PERSON;

  constructor(private route: ActivatedRoute, private computerService: ComputerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.computerService.getComputerById(+params['id']).subscribe(
        (response => {
          this.computer = response;
          this.selectedStatus = this.computer.status;
          this.selectedOperationalStatus = this.computer.operational_status;
          this.selectedOperationalImpact = this.computer.operational_impact;
        }))
    });
  }

}
