import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';
import { MemberListComponent } from '../member-list/member-list.component';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private _memberService: MemberService, private activatedRoute: ActivatedRoute) {
    this.galleryOptions = new Array<NgxGalleryOptions>();
    this.galleryImages = new Array<NgxGalleryImage>();
  }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ]
  }

  loadMember() {
    this._memberService.getMember(this.activatedRoute.snapshot.paramMap.get('username') || '')
      .subscribe(mem => {
        this.member = mem;
        this.galleryImages = this.getImage();
      });
  }

  getImage(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member?.photos)
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    return imageUrls
  }
}
