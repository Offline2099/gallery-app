import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { GalleriesChronologically } from './data/galleries-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  galleryGroups = GalleriesChronologically;

  userSettings = {
    selectOnMouseover: false
  }
}
