import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Computer} from "../../model/computer/computer";
import {ComputerService} from "../../model/computer/computer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";
import {SearchService} from "../../model/search-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-asset-manager-assets',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent implements OnInit, OnDestroy{

  public computers: Computer[];
  public displayedComputers: Computer[];

  public columnsToDisplay: string[] = ["name","serial-number","manufacturer","status","operational-system","location","owner"];
  dataSource = new MatTableDataSource<Computer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private searchSubscription!: Subscription;

  constructor(private computerService: ComputerService, private searchService: SearchService) {
    this.computers = [];
    this.displayedComputers = [];
  }

  ngOnInit(): void {
    this.getComputer();
    this.searchSubscription = this.searchService.search$.subscribe((term)=>{
      this.search(term);
    })
  }

  ngOnDestroy(): void {
    if (this.searchSubscription){
      this.searchSubscription.unsubscribe();
    }
  }

  private getComputer():void {
    this.computerService.getComputer().subscribe( //Returns an Observable and we use subscribe so we grab the data if there appears data
      (response: Computer[]) => {
        this.computers = response;
        this.displayedComputers = [...this.computers];
        this.dataSource.data = this.displayedComputers; // Set data for MatTableDataSource
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public search(key: string){
    const results: Computer[] = [];
    for (const computer of this.computers){
      if(computer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        computer.serial_number.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(computer);
      }
    }
    this.displayedComputers = results;
    if (key.trim() === ""){
      this.displayedComputers = [...this.computers];
    }
    this.dataSource.data = this.displayedComputers;
  }
}
