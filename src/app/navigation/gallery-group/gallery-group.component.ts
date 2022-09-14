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
  @Input() groupNameMobile: string;
  @Input() groupLabelType: number;
  @Input() galleries: Gallery[];

  gData: Gallery[] = [];
  groupLabel: string = '';
  collapsedOnMobile: boolean = true;

  constructor(private u: UtilitiesService) {
    this.groupName = '';
    this.groupPath = '';
    this.groupNameMobile = '';
    this.groupLabelType = 0;
    this.galleries = [];
  }

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    let imagesTotal = 0
    let entriesTotal = this.galleries.length;
    for (let i = 0; i < this.galleries.length; i++) {
      this.gData[i] = this.galleries[i];
      imagesTotal += this.galleries[i].numberOfImages;
    }
    if (this.groupLabelType == 1) 
      this.groupLabel = '(' + entriesTotal + ' galleries, ' + imagesTotal + ' images)';
    if (this.groupLabelType == 2) 
      this.groupLabel = '(' + entriesTotal + ' galleries)';
  }

  toggleOnMobile(): void {
    this.collapsedOnMobile = !this.collapsedOnMobile;
  }
}
