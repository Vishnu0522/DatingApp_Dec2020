import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  IsLoggedIn =false;
  constructor(public _accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this._accountService.login(this.model).subscribe(user=>{
      this.model = user;
      console.log(this.model);
      this.IsLoggedIn = true;
      this.toastr.success("User has logged In Successfully !!","sucess")
    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  logout(){
    this.IsLoggedIn = false;
    this.toastr.success("User has logged out Successfully !!","sucess")
  }

}
