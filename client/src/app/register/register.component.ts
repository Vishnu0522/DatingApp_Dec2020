import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeCompnent:any;
  @Output() CancelRegisteration = new EventEmitter();
  model:any={};
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    
  }

  Register(){
   // console.log(this.usersFromHomeCompnent);
   // console.log(this.model);
   this.accountService.register(this.model).subscribe(resp=>{
     console.log(resp);
     this.Cancel();
   },error=>{
     console.log(error);
   });
  }
  Cancel(){
      this.CancelRegisteration.emit(false);
  }
}
