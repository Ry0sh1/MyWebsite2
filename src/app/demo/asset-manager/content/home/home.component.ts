import {Component, OnDestroy, OnInit} from '@angular/core';
import {Computer, OperationSystem, Status} from "../../model/computer/computer";
import {OwnerService} from "../../model/owner/owner.service";
import {ComputerService} from "../../model/computer/computer.service";
import {Subscription} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {NgChartsModule} from 'ng2-charts';
import {Chart, Colors} from "chart.js";
import {colors} from "@angular/cli/src/utilities/color";

@Component({
  selector: 'app-asset-manager-home',
  standalone: true,
  imports: [
    MatButtonModule,
    NgChartsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class AssetManagerHomeComponent implements OnInit, OnDestroy{

  private allComputer: Computer[];
  private computerServiceSubscription!: Subscription;
  public chartOS: any;
  public chartStatus: any;

  constructor(private ownerService: OwnerService, private computerService: ComputerService) {
    this.allComputer = [];
  }

  ngOnInit(): void {
    this.computerServiceSubscription = this.computerService.getComputer().subscribe((response) => {
      this.allComputer = response;
      let newDataOS = ["0","0","0","0","0","0","0"];
      let newDataStatus = ["0","0","0","0","0","0","0","0","0","0","0","0"]
      for (let i = 0; i < this.allComputer.length; i++){
        switch (this.allComputer[i].operation_system){
          case OperationSystem.WINDOWS11: newDataOS[0]=(parseInt(newDataOS[0])+1).toString();break;
          case OperationSystem.WINDOWS10: newDataOS[1]=(parseInt(newDataOS[1])+1).toString();break;
          case OperationSystem.WINDOWS11_PRO: newDataOS[2]=(parseInt(newDataOS[2])+1).toString();break;
          case OperationSystem.UBUNTU: newDataOS[3]=(parseInt(newDataOS[3])+1).toString();break;
          case OperationSystem.DEBIAN: newDataOS[4]=(parseInt(newDataOS[4])+1).toString();break;
          case OperationSystem.FEDORA: newDataOS[5]=(parseInt(newDataOS[5])+1).toString();break;
          case OperationSystem.MAC_OS: newDataOS[6]=(parseInt(newDataOS[6])+1).toString();break;
        }
        switch (this.allComputer[i].status){
          case Status.ACTIVE: newDataStatus[0] = (parseInt(newDataStatus[0]) + 1).toString();break;
          case Status.OUTGOING: newDataStatus[1] = (parseInt(newDataStatus[1]) + 1).toString();break;
          case Status.RETIRED: newDataStatus[2] = (parseInt(newDataStatus[2]) + 1).toString();break;
          case Status.DEFECTIVE: newDataStatus[3] = (parseInt(newDataStatus[3]) + 1).toString();break;
          case Status.INCOMING: newDataStatus[4] = (parseInt(newDataStatus[4]) + 1).toString();break;
          case Status.STOCK: newDataStatus[5] = (parseInt(newDataStatus[5]) + 1).toString();break;
          case Status.RESERVED: newDataStatus[6] = (parseInt(newDataStatus[6]) + 1).toString();break;
          case Status.UNKNOWN: newDataStatus[7] = (parseInt(newDataStatus[7]) + 1).toString();break;
          case Status.ON_THE_WAY: newDataStatus[8] = (parseInt(newDataStatus[8]) + 1).toString();break;
          case Status.MISSING: newDataStatus[9] = (parseInt(newDataStatus[9]) + 1).toString();break;
          case Status.SCRAPPED: newDataStatus[10] = (parseInt(newDataStatus[10]) + 1).toString();break;
          case Status.RECYCLED: newDataStatus[11] = (parseInt(newDataStatus[11]) + 1).toString();break;
        }
      }
      this.RenderChartOS(newDataOS);
      this.RenderChartStatus(newDataStatus);
    });
  }

  RenderChartOS(newDataOS: string[]){
    const labelColors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan'
    ];
    this.chartOS = new Chart("ChartOS", {
      type: 'pie',
      data: {
        labels: ['Windows 10', 'Windows 11', 'Windows 11 Pro', 'Ubuntu', 'Debian', 'Fedora', 'Mac_OS'],
        datasets: [
          {
            label: "Amount",
            data: newDataOS,
            backgroundColor: labelColors
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Operations System of all Computers'
          }
        }
      },
    });
  }

  RenderChartStatus(newDataStatus: string[]){
    const labelColors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan',
      'pink', 'brown', 'teal', 'lime', 'indigo', 'maroon', 'navy', 'olive', 'silver', 'aqua', 'fuchsia', 'gray'
    ];
    this.chartStatus = new Chart("ChartStatus", {
      type: 'pie',
      data: {
        labels: ['Active', 'Outgoing', 'Retired', 'Defective', 'Incoming', 'Stock', 'Reserved', 'Unknown', 'On the way', 'Missing', 'Scrapped', 'Recycled'],
        datasets: [
          {
            label: "Amount",
            data: newDataStatus,
            backgroundColor: labelColors
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Status of all Computers'
          }
        }
      },
    });
  }

  ngOnDestroy(): void{
    if (this.computerServiceSubscription){
      this.computerServiceSubscription.unsubscribe();
    }
  }

}
