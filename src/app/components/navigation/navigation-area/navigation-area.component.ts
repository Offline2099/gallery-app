import { Component } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { GalleryGroupLabelTypes } from '../../../interfaces/ui';

@Component({
  selector: 'app-navigation-area',
  templateUrl: './navigation-area.component.html',
  styleUrls: ['./navigation-area.component.css']
})
export class NavigationAreaComponent {

  constructor(private data: DataService) { }

  groupsByYear = this.data.DefaultGalleries.byMonth;
  groupsByLocation = this.data.DefaultGalleries.byLocation;
  groupsByTag = this.data.DefaultGalleries.byTag;

  groupsEven = {
    byYear: this.groupsByYear.filter((g, i) => i % 2 === 0),
    byLocation: this.groupsByLocation.filter((g, i) => i % 2 === 0),
    byTag: this.groupsByTag.filter((g, i) => i % 2 === 0)
  }
  groupsOdd = {
    byYear: this.groupsByYear.filter((g, i) => i % 2 === 1),
    byLocation: this.groupsByLocation.filter((g, i) => i % 2 === 1),
    byTag: this.groupsByTag.filter((g, i) => i % 2 === 1)
  }
  
  navigationTabs = [
    {
      name: 'Years and Months',
      nameMobile: 'Years',
      active: true,
      galleryGroups: this.groupsByYear,
      columns: [this.groupsEven.byYear, this.groupsOdd.byYear],
      labelType: GalleryGroupLabelTypes.countAll
    },
    {
      name: 'Places and Locations',
      nameMobile: 'Places',
      active: false,      
      galleryGroups: this.groupsByLocation,
      columns: [this.groupsEven.byLocation, this.groupsOdd.byLocation],
      labelType: GalleryGroupLabelTypes.countGalleries
    },
    {
      name: 'Tags and Features',
      nameMobile: 'Tags',
      active: false,
      galleryGroups: this.groupsByTag,
      columns: [this.groupsEven.byTag, this.groupsOdd.byTag],
      labelType: GalleryGroupLabelTypes.countGalleries
    }
  ];

  activateNavTab(index: number): void {
    this.navigationTabs.forEach((tab, i) => {
      tab.active = (i == index);
    });
  }
}
