import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../data/gallery';

@Component({
  selector: 'app-gallery-group',
  templateUrl: './gallery-group.component.html',
  styleUrls: ['./gallery-group.component.css']
})
export class GalleryGroupComponent implements OnInit {

  @Input() groupName: string;
  @Input() galleries: Gallery[];

  constructor() {
    this.groupName = '';
    this.galleries = [];
  }

  ngOnInit(): void {
  }

}
