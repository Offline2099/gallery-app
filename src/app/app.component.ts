import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GalleriesChronologically } from './data/galleries-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  galleryGroups = GalleriesChronologically;

  userSettings = {
    selectOnMouseover: false
  }
  
}
