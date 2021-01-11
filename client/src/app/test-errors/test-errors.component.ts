import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl ="http://localhost:5001/api/";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get401Error(){
    return this.http.get(this.baseUrl+"buggy/auth").subscribe(result=>{
      console.log(result);
    },error=>{
      console.log(error);
    });
  }

  get404Error(){
    return this.http.get(this.baseUrl+"buggy/not-found").subscribe(result=>{
      console.log(result);
    },error=>{
      console.log(error);
    });
  }

  get500Error(){
    return this.http.get(this.baseUrl+"buggy/server-error").subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });
  }

  getBadRequest(){
    return this.http.get(this.baseUrl+"buggy/bad-request").subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });
  }

  get400ValidationError(){
    return this.http.get(this.baseUrl+"account/register").subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });
  }


}
