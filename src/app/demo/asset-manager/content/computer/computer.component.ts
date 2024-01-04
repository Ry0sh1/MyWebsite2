import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Computer} from "../../model/computer/computer";
import {ComputerService} from "../../model/computer/computer.service";

@Component({
  selector: 'app-asset-manager-computer',
  standalone: true,
  imports: [],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css'
})
export class ComputerComponent implements OnInit{

  computer!: Computer;

  constructor(private route: ActivatedRoute, private computerService: ComputerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.computerService.getComputerById(+params['id']).subscribe(
        (response => {
          this.computer = response;
        })
      )
    });
  }

}
