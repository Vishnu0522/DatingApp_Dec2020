import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Array<Member>;
  constructor(private memberService:MemberService) { 
    this.members = new Array<Member>();
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(){
    this.memberService.getMembers().subscribe(member=>{
      this.members = member;
      console.log(this.members);
    });
  }

}
