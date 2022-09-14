import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from './user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#app-loading-placeholder');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
