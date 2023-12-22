import {Component, OnInit} from '@angular/core';
import {Computer} from "../model/computer/computer";
import {ComputerService} from "../model/computer/computer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-asset-manager-computer',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './asset-manager-computer.component.html',
  styleUrl: './asset-manager-computer.component.css'
})
export class AssetManagerComputerComponent implements OnInit{
  public computers: Computer[];

  ngOnInit(): void {
    this.getComputer();
  }

  constructor(private computerService: ComputerService) {
    this.computers = [];
  }

  public getComputer():void{
    this.computerService.getComputer().subscribe( //Returns an Observable and we use subscribe so we grab the data if there appears data
      (response: Computer[]) => {
        this.computers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
