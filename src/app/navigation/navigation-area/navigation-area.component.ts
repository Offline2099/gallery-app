import { Component, OnInit } from '@angular/core';
import { GalleriesChronologically } from '../../data/galleries-data'; 

@Component({
  selector: 'app-navigation-area',
  templateUrl: './navigation-area.component.html',
  styleUrls: ['./navigation-area.component.css']
})
export class NavigationAreaComponent implements OnInit {

  galleryGroups = GalleriesChronologically;
  galleryGroupsEven = GalleriesChronologically.filter((a, i) => i % 2 === 1);
  galleryGroupsOdd = GalleriesChronologically.filter((a, i) => i % 2 === 0);
  columns: any[] = [this.galleryGroupsOdd, this.galleryGroupsEven];

  constructor() { }

  ngOnInit(): void {
  }

}
