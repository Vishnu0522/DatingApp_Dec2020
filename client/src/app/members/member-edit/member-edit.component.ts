import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_model/member';
import { User } from 'src/app/_model/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member!: Member;
  user: User;
  constructor(private _accountService: AccountService,
    private _memberService: MemberService,
    private _toastService: ToastrService) {
    this.user = new User();
    this._accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this._memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    });
  }

  updatedMember() {
    this._memberService.updateMember(this.member).subscribe(() => {
      this._toastService.success('Profile Update Sucessfully!');
      this.editForm.reset();
    });
  }

}
