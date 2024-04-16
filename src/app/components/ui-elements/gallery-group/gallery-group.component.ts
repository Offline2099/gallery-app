import { Component, Input } from '@angular/core';

import { Gallery } from '../../../interfaces/data';
import { GalleryGroupLabelTypes } from '../../../interfaces/ui';

@Component({
  selector: 'app-gallery-group',
  templateUrl: './gallery-group.component.html',
  styleUrls: ['./gallery-group.component.css']
})
export class GalleryGroupComponent {

  @Input() groupName: string = '';
  @Input() groupPath: string = '';
  @Input() galleries: Gallery[] = [];
  @Input() labelType: number = 0;

  label: string = '';
  collapsedOnMobile: boolean = true;

  ngOnInit(): void {
    this.prepareLabel();
  }

  prepareLabel(): void {
    
    let entriesTotal: number = this.galleries.length;
    let imagesTotal: number = this.galleries.map(g => g.images).flat().length;
 
    if (this.labelType == GalleryGroupLabelTypes.countAll) 
      this.label = `(${entriesTotal} galleries, ${imagesTotal} images)`;
    else if (this.labelType == GalleryGroupLabelTypes.countGalleries) 
      this.label = `(${entriesTotal} galleries)`;
  }

  toggleOnMobile(): void {
    this.collapsedOnMobile = !this.collapsedOnMobile;
  }
}
