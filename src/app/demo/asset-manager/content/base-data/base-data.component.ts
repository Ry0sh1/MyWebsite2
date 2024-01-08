import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OwnerService} from "../../model/owner/owner.service";
import {Owner} from "../../model/owner/owner";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {SearchService} from "../../model/search-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-asset-manager-base-data',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgForOf,
    RouterLink,
    NgxPaginationModule,
  ],
  templateUrl: './base-data.component.html',
  styleUrl: './base-data.component.css'
})
export class BaseDataComponent implements OnInit, OnDestroy{

  public allOwner: Owner[];
  public displayedOwners:Owner[];
  public columnsToDisplay: string[] = ["last_name","first_name","street","home","postal_code","number"];
  public dataSource = new MatTableDataSource<Owner>();
  private searchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private ownerService: OwnerService, private searchService: SearchService) {
    this.allOwner = [];
    this.displayedOwners = [];
  }

  ngOnInit(): void {
    this.getOwner();
    this.searchSubscription = this.searchService.search$.subscribe((term)=>{
      this.search(term);
    })
  }
  ngOnDestroy(): void {
    if (this.searchSubscription){
      this.searchSubscription.unsubscribe();
    }
  }

  private getOwner() {
    this.ownerService.getOwner().subscribe(
      (response: Owner[]) => {
        this.allOwner = response;
        this.displayedOwners = this.allOwner;
        this.dataSource.data = [...this.displayedOwners];
        this.dataSource.paginator = this.paginator;
      })
  }
  public search(key: string){
    const results: Owner[] = [];
    for (const owner of this.allOwner){
      if(owner.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        owner.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(owner);
      }
    }
    this.displayedOwners = results;
    if (key.trim() === ""){
      this.displayedOwners = [...this.allOwner];
    }
    this.dataSource.data = this.displayedOwners;
  }

}
