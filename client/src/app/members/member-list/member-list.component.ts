import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 // members:Array<Member>;
  members$:Observable<Member[]>;
  constructor(private memberService:MemberService) { 
    this.members$ = new Observable<Member[]>();
  }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

}
