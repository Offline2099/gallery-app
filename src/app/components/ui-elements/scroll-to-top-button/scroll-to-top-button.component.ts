import { Component, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top-button',
  host: {'[class.button-invisible]': 'verticalOffset < 250'},
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent {

  constructor(private scroller: ViewportScroller) {}

  verticalOffset: number = 0;

  @HostListener('window:scroll') onWindowScroll() {
    this.verticalOffset = this.scroller.getScrollPosition()[1];
  }

  @HostListener('click') onClick() {
    this.scroller.scrollToPosition([0, 0]);
  }

}
