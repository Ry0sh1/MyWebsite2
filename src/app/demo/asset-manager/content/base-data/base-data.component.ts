import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerService} from "../../model/owner/owner.service";
import {Owner} from "../../model/owner/owner";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

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
export class BaseDataComponent implements OnInit{

  public allOwner: Owner[];
  public columnsToDisplay: string[] = ["last_name","first_name","street","home","postal_code","number"];
  public dataSource = new MatTableDataSource<Owner>()

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private ownerService: OwnerService) {
    this.allOwner = [];
  }

  ngOnInit(): void {
    this.getOwner();
  }

  private getOwner() {
    this.ownerService.getOwner().subscribe(
      (response: Owner[]) => {
        this.allOwner = response;
        this.dataSource.data = this.allOwner;
        this.dataSource.paginator = this.paginator;
      })
  }
}
