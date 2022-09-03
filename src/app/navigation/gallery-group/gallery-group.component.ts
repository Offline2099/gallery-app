import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../data/data-types';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-gallery-group',
  templateUrl: './gallery-group.component.html',
  styleUrls: ['./gallery-group.component.css']
})
export class GalleryGroupComponent implements OnInit {

  @Input() groupName: string;
  @Input() groupPath: string;
  @Input() groupNameShort: string;
  @Input() galleries: Gallery[];

  gData: Gallery[] = [];
  imagesTotal = 0;
  visibleOnMobile: boolean = false;

  constructor(private u: UtilitiesService) {
    this.groupName = '';
    this.groupPath = '';
    this.groupNameShort = '';
    this.galleries = [];
  }

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    for (let i = 0; i < this.galleries.length; i++) {
      this.gData[i] = this.galleries[i];
      this.imagesTotal += this.galleries[i].numberOfImages;
    }
  }
}
