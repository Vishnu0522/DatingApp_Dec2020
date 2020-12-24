import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  IsLoggedIn =false;
  constructor(private _accountService:AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this._accountService.login(this.model).subscribe(user=>{
      this.model = user;
      console.log(this.model);
      this.IsLoggedIn = true;
    },error =>{
      console.log(error);
    });
  }

  logout(){
    this.IsLoggedIn = false;
  }

}
