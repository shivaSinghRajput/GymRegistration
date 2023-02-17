import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private baseUrl:string='http://localhost:3000/enquiry';
  constructor(private http:HttpClient) { }

  postRegistration(registerObj:User){
    return this.http.post<User>(`${this.baseUrl}`,registerObj)
  }

  getRegistration():Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}`)
  }

  updateRegistration(registerObj:User,id:number){
    return this.http.put<User>(`${this.baseUrl}/${id}`,registerObj)
  }

  deleteRegistration(id:number){
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getRegistrationUserId(id:number){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }
}
