import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.removeLoadingPlaceholder();
  }

  removeLoadingPlaceholder(): void {
    let loader: HTMLElement = this.renderer.selectRootElement('#app-loading-placeholder');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
