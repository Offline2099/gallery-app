import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../../interfaces/data';

@Component({
  selector: 'app-gallery-group',
  templateUrl: './gallery-group.component.html',
  styleUrls: ['./gallery-group.component.css']
})
export class GalleryGroupComponent implements OnInit {

  @Input() groupName: string = '';
  @Input() groupPath: string = '';
  @Input() groupNameMobile: string = '';
  @Input() groupLabelType: number = 0;
  @Input() galleries: Gallery[] = [];

  groupLabel: string = '';
  collapsedOnMobile: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.prepareLabel();
  }

  prepareLabel(): void {
    
    let entriesTotal: number = this.galleries.length;

    let imagesTotal: number = 0;
    this.galleries.forEach(g => imagesTotal += g.numberOfImages);

    if (this.groupLabelType == 1) 
      this.groupLabel = ['(', entriesTotal, ' galleries, ', imagesTotal, ' images)'].join('');

    if (this.groupLabelType == 2) 
      this.groupLabel = ['(', entriesTotal, ' galleries)'].join('');
  }

  toggleOnMobile(): void {
    this.collapsedOnMobile = !this.collapsedOnMobile;
  }
}
