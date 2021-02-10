import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;
  constructor() { }

  ngOnInit(): void {
  }
}
