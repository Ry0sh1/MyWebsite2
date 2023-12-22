import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Computer} from "./computer";
import {NgForOf} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class ComputerService {

  private apiServerUrl = "http://localhost:8080/asset-manager";

  constructor(private http:HttpClient) { }

  public getComputer():Observable<Computer[]>{
    return this.http.get<Computer[]>(`${this.apiServerUrl}/computer/all`);
  }

  public addComputer(computer: Computer):Observable<Computer>{
    return this.http.post<Computer>(`${this.apiServerUrl}/computer/add`,computer);
  }

  public updateComputer(computer: Computer):Observable<Computer>{
    return this.http.put<Computer>(`${this.apiServerUrl}/computer/update`,computer);
  }

  public delete(computer: Computer):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/computer/delete`);
  }

  public getComputerById(id:number):Observable<Computer>{
    return this.http.get<Computer>(`${this.apiServerUrl}/computer/`+id);
  }

}
