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
  @Input() groupNameShort: string;
  @Input() galleries: Gallery[];

  gData: Gallery[] = [];
  imagesTotal = 0;
  visibleOnMobile: boolean = false;

  constructor(private u: UtilitiesService) {
    this.groupName = '';
    this.groupNameShort = '';
    this.galleries = [];
  }

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    for (let i = 0; i < this.galleries.length; i++) {

      this.gData[i] = { type: '', path: '', name: '', nameShort: '', numberOfImages: 0 };

      this.gData[i].numberOfImages = this.galleries[i].numberOfImages;
      this.imagesTotal += this.galleries[i].numberOfImages;

      if (this.galleries[i].type == 'chronological') {
        this.gData[i].path = '/' + this.galleries[i].year + '/' + this.galleries[i].month;
        this.gData[i].name = this.u.monthName(this.galleries[i].month);
        this.gData[i].nameShort = this.u.monthName(this.galleries[i].month, true);
      }
    }
  }
}
