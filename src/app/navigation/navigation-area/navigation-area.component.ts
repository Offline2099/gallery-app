import { Component, OnInit } from '@angular/core';
import { DefaultGalleries } from '../../data/galleries-data'; 

@Component({
  selector: 'app-navigation-area',
  templateUrl: './navigation-area.component.html',
  styleUrls: ['./navigation-area.component.css']
})
export class NavigationAreaComponent implements OnInit {

  groupsByYears = DefaultGalleries.byMonths.reverse();
  groupsByLocations = DefaultGalleries.byLocations;
  groupsByTags = DefaultGalleries.byTags;

  galleryGroupsEven = {
    byYears: this.groupsByYears.filter((a, i) => i % 2 === 1),
    byLocations: this.groupsByLocations.filter((a, i) => i % 2 === 1),
    byTags: this.groupsByTags.filter((a, i) => i % 2 === 1)
  }
  galleryGroupsOdd = {
    byYears: this.groupsByYears.filter((a, i) => i % 2 === 0),
    byLocations: this.groupsByLocations.filter((a, i) => i % 2 === 0),
    byTags: this.groupsByTags.filter((a, i) => i % 2 === 0)
  }
  columns: any[] = [this.galleryGroupsOdd, this.galleryGroupsEven];

  navigationTabs = [
    {
      name: "Years and Months",
      nameMobile: "Years",
      labelType: 1,
      active: true,
      galleryGroups: this.groupsByYears,
      columns: [this.galleryGroupsOdd.byYears, this.galleryGroupsEven.byYears]
    },
    {
      name: "Places and Locations",
      nameMobile: "Places",
      labelType: 2,
      active: false,
      galleryGroups: this.groupsByLocations,
      columns: [this.galleryGroupsOdd.byLocations, this.galleryGroupsEven.byLocations]
    },
    {
      name: "Tags and Features",
      nameMobile: "Tags",
      labelType: 2,
      active: false,
      galleryGroups: this.groupsByTags,
      columns: [this.galleryGroupsOdd.byTags, this.galleryGroupsEven.byTags]
    }
  ];

  activateNavTab(index: number): void {
    for (let i = 0; i < this.navigationTabs.length; i ++) {
      this.navigationTabs[i].active = (i == index);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}
