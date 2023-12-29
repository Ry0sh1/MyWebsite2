import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Owner} from "./owner";

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  private apiServerUrl = "http://localhost:8080/asset-manager"

  constructor(private http:HttpClient) { }

  public getOwner():Observable<Owner[]>{
    return this.http.get<Owner[]>(`${this.apiServerUrl}/owner/all`);
  }

  public addOwner(owner: Owner):Observable<Owner>{
    return this.http.post<Owner>(`${this.apiServerUrl}/owner/add`, owner);
  }

  public updateOwner(owner: Owner):Observable<Owner>{
    return this.http.put<Owner>(`${this.apiServerUrl}/owner/update`,owner);
  }

  public deleteOwner(id: number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/owner/delete/` + id);
  }

  public getOwnerById(id: number):Observable<Owner>{
    return this.http.get<Owner>(`${this.apiServerUrl}/owner/`+id)
  }

}
