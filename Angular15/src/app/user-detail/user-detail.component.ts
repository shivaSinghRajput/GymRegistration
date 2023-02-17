import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  public userId!:number;
  userDetails!:User
  constructor(private activateRoute:ActivatedRoute,private api:ApiService){}
 
  ngOnInit(): void {
    this.activateRoute.params.subscribe(val=>{
      this.userId= val['id']
      this.featchUserDetails(this.userId);

    })
  }

  featchUserDetails(userId:number){
    this.api.getRegistrationUserId(this.userId)
    .subscribe(res=>{
      this.userDetails=res;
    })
  }

}
