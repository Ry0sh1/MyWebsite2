import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AccountStatus,
  Computer,
  OperationalStatus,
  OperationImpact,
  OperationSystem,
  Property,
  Status
} from "../../model/computer/computer";
import {OwnerService} from "../../model/owner/owner.service";
import {ComputerService} from "../../model/computer/computer.service";
import {Subscription} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {NgChartsModule} from 'ng2-charts';
import {Chart} from "chart.js";
import {MatSelectModule} from "@angular/material/select";

export type CurrentLabel = {
  label: string[];
  labelName: string;
  labelTitle: string;
  data: string[];
}

@Component({
  selector: 'app-asset-manager-home',
  standalone: true,
  imports: [
    MatButtonModule,
    NgChartsModule,
    MatSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class AssetManagerHomeComponent implements OnInit, OnDestroy{

  private allComputer: Computer[];
  private computerServiceSubscription!: Subscription;
  public chartOS: any;
  public chartStatus: any;
  public chartComputerStock: any;
  public chartCustom: any;

  public chartCustomOptions = ['Status','Property','Operation system','Operation status','Operation impact','Account status','Manufacturer'];

  public statusLabel = ['Active', 'Outgoing', 'Retired', 'Defective', 'Incoming',
    'Stock', 'Reserved', 'Unknown', 'On the way', 'Missing', 'Scrapped', 'Recycled'];
  public propertyLabel = ['Unknown','Dedicated to company','Company used','Employee','External'];
  public operationSystemLabel = ['Windows 10', 'Windows 11', 'Windows 11 Pro', 'Ubuntu', 'Debian', 'Fedora', 'Mac_OS'];
  public operationalStatusLabel = ['Unknown','Powered on','Powered off','Paused'];
  public operationImpactLabel = ['Person','Working Group','Company'];
  public accountStatusLabel = ['Active','Deleted','Inactive'];
  public manufacturerLabel = ['Dell','HP','Lenovo','Apple'];

  public selected = this.chartCustomOptions[6];

  //Show Manufacturer as Default on Custom Chart
  public currentCustom: Partial<CurrentLabel> = {
    label: this.manufacturerLabel,
    labelName: "Manufacturer",
    labelTitle: "Manufacturer Distribution"
  };

  public dataStatus =  ["0","0","0","0","0","0","0","0","0","0","0","0"];
  public dataOS = ["0","0","0","0","0","0","0"];
  public dataProperty = ["0","0","0","0","0"];
  public dataOperationalStatus = ["0","0","0","0"];
  public dataOperationImpact = ["0","0","0"];
  public dataAccountStatus = ["0","0","0"];
  public dataManufacturer = ["0","0","0","0"];

  constructor(private ownerService: OwnerService, private computerService: ComputerService) {
    this.allComputer = [];
  }

  ngOnInit(): void {
    this.computerServiceSubscription = this.computerService.getComputer().subscribe((response) => {
      this.allComputer = response;
      let dates = [2000,2010,2020,2030,2040,2050,2060,2070,2080,2090,2100];
      let dateValue = [0,0,0,0,0,0,0,0,0,0,0];
      for (let i = 0; i < this.allComputer.length; i++){
        this.countOS(this.allComputer[i]);
        this.countStatus(this.allComputer[i]);
        this.countManufacturer(this.allComputer[i]);
        this.countProperty(this.allComputer[i]);
        this.countOperationalStatus(this.allComputer[i]);
        this.countOperationImpact(this.allComputer[i]);
        this.countAccountStatus(this.allComputer[i]);

        this.currentCustom.data = this.dataManufacturer;

        for (let j = 0; j < dates.length;j++){
          if (new Date(this.allComputer[i].end_of_operation) > new Date(dates[j],1,1)){
            dateValue[j]++;
          }
        }
      }
      this.RenderChartCustom();
      this.RenderChartOS();
      this.RenderChartStatus();
      this.RenderChartComputerStock(dateValue)
    });
  }

  private countOS(computer: Computer){
    switch (computer.operation_system){
      case OperationSystem.WINDOWS11: this.dataOS[0]=(parseInt(this.dataOS[0])+1).toString();break;
      case OperationSystem.WINDOWS10: this.dataOS[1]=(parseInt(this.dataOS[1])+1).toString();break;
      case OperationSystem.WINDOWS11_PRO: this.dataOS[2]=(parseInt(this.dataOS[2])+1).toString();break;
      case OperationSystem.UBUNTU: this.dataOS[3]=(parseInt(this.dataOS[3])+1).toString();break;
      case OperationSystem.DEBIAN: this.dataOS[4]=(parseInt(this.dataOS[4])+1).toString();break;
      case OperationSystem.FEDORA: this.dataOS[5]=(parseInt(this.dataOS[5])+1).toString();break;
      case OperationSystem.MAC_OS: this.dataOS[6]=(parseInt(this.dataOS[6])+1).toString();break;
    }
  }
  private countStatus(computer: Computer){
    switch (computer.status){
      case Status.ACTIVE: this.dataStatus[0] = (parseInt(this.dataStatus[0]) + 1).toString();break;
      case Status.OUTGOING: this.dataStatus[1] = (parseInt(this.dataStatus[1]) + 1).toString();break;
      case Status.RETIRED: this.dataStatus[2] = (parseInt(this.dataStatus[2]) + 1).toString();break;
      case Status.DEFECTIVE: this.dataStatus[3] = (parseInt(this.dataStatus[3]) + 1).toString();break;
      case Status.INCOMING: this.dataStatus[4] = (parseInt(this.dataStatus[4]) + 1).toString();break;
      case Status.STOCK: this.dataStatus[5] = (parseInt(this.dataStatus[5]) + 1).toString();break;
      case Status.RESERVED: this.dataStatus[6] = (parseInt(this.dataStatus[6]) + 1).toString();break;
      case Status.UNKNOWN: this.dataStatus[7] = (parseInt(this.dataStatus[7]) + 1).toString();break;
      case Status.ON_THE_WAY: this.dataStatus[8] = (parseInt(this.dataStatus[8]) + 1).toString();break;
      case Status.MISSING: this.dataStatus[9] = (parseInt(this.dataStatus[9]) + 1).toString();break;
      case Status.SCRAPPED: this.dataStatus[10] = (parseInt(this.dataStatus[10]) + 1).toString();break;
      case Status.RECYCLED: this.dataStatus[11] = (parseInt(this.dataStatus[11]) + 1).toString();break;
    }
  }
  private countManufacturer(computer: Computer){
    switch (computer.manufacturer){
      case 'Dell': this.dataManufacturer[0] = (parseInt(this.dataManufacturer[0]) + 1).toString();break;
      case 'HP': this.dataManufacturer[1] = (parseInt(this.dataManufacturer[1]) + 1).toString();break;
      case 'Lenovo': this.dataManufacturer[2] = (parseInt(this.dataManufacturer[2]) + 1).toString();break;
      case 'Apple': this.dataManufacturer[3] = (parseInt(this.dataManufacturer[3]) + 1).toString();break;
    }
  }
  private countProperty(computer: Computer){
    switch (computer.property){
      case Property.UNKNOWN: this.dataProperty[0] = (parseInt(this.dataProperty[0]) + 1).toString();break;
      case Property.DEDICATED_TO_COMPANY: this.dataProperty[1] = (parseInt(this.dataProperty[1]) + 1).toString();break;
      case Property.COMPANY_USED: this.dataProperty[2] = (parseInt(this.dataProperty[2]) + 1).toString();break;
      case Property.EMPLOYEE: this.dataProperty[3] = (parseInt(this.dataProperty[3]) + 1).toString();break;
      case Property.EXTERNAL: this.dataProperty[4] = (parseInt(this.dataProperty[4]) + 1).toString();break;
    }
  }
  private countOperationalStatus(computer: Computer){
    switch (computer.operational_status){
      case OperationalStatus.UNKNOWN: this.dataOperationalStatus[0] = (parseInt(this.dataOperationalStatus[0]) + 1).toString();break;
      case OperationalStatus.POWERED_ON: this.dataOperationalStatus[1] = (parseInt(this.dataOperationalStatus[1]) + 1).toString();break;
      case OperationalStatus.POWERED_OFF: this.dataOperationalStatus[2] = (parseInt(this.dataOperationalStatus[2]) + 1).toString();break;
      case OperationalStatus.PAUSED: this.dataOperationalStatus[3] = (parseInt(this.dataOperationalStatus[3]) + 1).toString();break;
    }
  }
  private countOperationImpact(computer: Computer){
    switch (computer.operational_impact){
      case OperationImpact.PERSON: this.dataOperationImpact[0] = (parseInt(this.dataOperationImpact[0]) + 1).toString();break;
      case OperationImpact.WORKING_GROUP: this.dataOperationImpact[1] = (parseInt(this.dataOperationImpact[1]) + 1).toString();break;
      case OperationImpact.COMPANY: this.dataOperationImpact[2] = (parseInt(this.dataOperationImpact[2]) + 1).toString();break;
    }
  }
  private countAccountStatus(computer: Computer){
    switch (computer.account_status){
      case AccountStatus.ACTIVE: this.dataAccountStatus[0] = (parseInt(this.dataAccountStatus[0]) + 1).toString();break;
      case AccountStatus.DELETED: this.dataAccountStatus[1] = (parseInt(this.dataAccountStatus[1]) + 1).toString();break;
      case AccountStatus.INACTIVE: this.dataAccountStatus[2] = (parseInt(this.dataAccountStatus[2]) + 1).toString();break;
    }
  }



  RenderChartOS(){
    const labelColors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan'
    ];
    this.chartOS = new Chart("ChartOS", {
      type: 'pie',
      data: {
        labels: this.operationSystemLabel,
        datasets: [
          {
            label: "Amount",
            data: this.dataOS,
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
  RenderChartStatus(){
    const labelColors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan',
      'pink', 'brown', 'teal', 'lime', 'indigo', 'maroon', 'navy', 'olive', 'silver', 'aqua', 'fuchsia', 'gray'
    ];
    this.chartStatus = new Chart("ChartStatus", {
      type: 'pie',
      data: {
        labels: this.statusLabel,
        datasets: [
          {
            label: "Amount",
            data: this.dataStatus,
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
  RenderChartComputerStock(newDataComputerStock: number[]){
    this.chartComputerStock = new Chart("ChartComputerStock", {
      type: 'line',
      data: {
        labels: ["2000","2010","2020","2030","2040","2050","2060","2070","2080","2090","2100"],
        datasets: [{
          label: 'Computer Stock',
          data: newDataComputerStock,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }],
      }
    });
  }
  RenderChartCustom(){
    if (this.chartCustom) {
      this.chartCustom.destroy(); // Destroy the existing chart
    }
    const labelColors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan',
      'pink', 'brown', 'teal', 'lime', 'indigo', 'maroon', 'navy', 'olive', 'silver', 'aqua', 'fuchsia', 'gray'
    ];
    this.chartCustom = new Chart("ChartCustom", {
      type: 'pie',
      data: {
        labels: this.currentCustom.label,
        datasets: [
          {
            label: this.currentCustom.labelName,
            data: this.currentCustom.data,
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
            text: this.currentCustom.labelTitle
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
  public changeOption(){

    //['Status','Property','Operation system','Operation status','Operation impact','Account status','Manufacturer']

    setTimeout(()=>{
      console.log(this.selected);
      switch (this.selected){
        case "Status": {
          this.currentCustom = {
            label: this.statusLabel,
            labelName: "Status",
            labelTitle: "Status of all Computer",
            data: this.dataStatus
          }
          break;
        }
        case "Property":{
          this.currentCustom = {
            label: this.propertyLabel,
            labelName: "Property",
            labelTitle: "Property of all Computer",
            data: this.dataProperty
          }
          break;
        }
        case "Operation system": {
          this.currentCustom = {
            label: this.operationSystemLabel,
            labelName: "OS",
            labelTitle: "Operation System of all Computer",
            data: this.dataOS
          }
          break;
        }
        case "Operation status":{
          this.currentCustom = {
            label: this.operationalStatusLabel,
            labelName: "Operational Status",
            labelTitle: "Operation Status of all Computer",
            data: this.dataOperationalStatus
          }
          break;
        }
        case "Operation impact":{
          this.currentCustom = {
            label: this.operationImpactLabel,
            labelName: "Operation Impact",
            labelTitle: "Operation Impact of all Computer",
            data: this.dataOperationImpact
          }
          break;
        }
        case "Account status":{
          this.currentCustom = {
            label: this.accountStatusLabel,
            labelName: "Account Status",
            labelTitle: "Account Status of all computer",
            data: this.dataAccountStatus
          }
          break;
        }
        case "Manufacturer":{
          this.currentCustom = {
            label: this.manufacturerLabel,
            labelName: "Manufacturer",
            labelTitle: "Manufacturer of all Computer",
            data: this.dataManufacturer
          }
          break;
        }

      }
      this.RenderChartCustom();
    },2)
  }

}
