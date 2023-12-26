import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Computer} from "../model/computer/computer";
import {ComputerService} from "../model/computer/computer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";

@Component({
  selector: 'app-asset-manager-computer',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './asset-manager-computer.component.html',
  styleUrl: './asset-manager-computer.component.css'
})
export class AssetManagerComputerComponent implements OnInit{

  public computers: Computer[];

  public columnsToDisplay: string[] = ["name","serial-number","manufacturer"];
  dataSource = new MatTableDataSource<Computer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private computerService: ComputerService) {
    this.computers = [];
  }

  ngOnInit(): void {
    this.getComputer();
  }

  public getComputer():void {
    this.computerService.getComputer().subscribe( //Returns an Observable and we use subscribe so we grab the data if there appears data
      (response: Computer[]) => {
        this.computers = response;
        this.dataSource.data = this.computers; // Set data for MatTableDataSource
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
