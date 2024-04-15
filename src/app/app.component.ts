import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { UserSettingsService } from './services/user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  mainPage: boolean = true;
  chronological: boolean = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    public userSettings: UserSettingsService) {}

  ngOnInit() {
    this.router.events.subscribe(data => {
      if (data instanceof ActivationEnd) {
        this.mainPage = !data.snapshot.url.length;
        if (!this.mainPage) {
          let gType: string = data.snapshot.data['gallery'].type;
          this.chronological = (gType == 'month' || gType == 'year');
        }
      }
    });
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#app-loading-placeholder');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
