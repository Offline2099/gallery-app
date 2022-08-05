import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gallery } from '../data/gallery';
import {UserSettingsService} from '../user-settings.service';

function times(max: Number) {
  return {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < max; i++, yield) {
      }
    }
  };
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() g: Gallery;
  @Input() userSettings: {
    selectOnMouseover: boolean
  };

  times = times;

  scrolled = 0;
  currentImage = 1;
  imageOverlayDisplayed = false;
  aciveMouseover: boolean[] = [];
 
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userSettingsService: UserSettingsService) {
    this.g = activatedRoute.snapshot.data['gallery'];
    this.userSettings = userSettingsService.getUserSettings();
    for (let i = 0; i < this.g.numberOfImages; i++) {
      this.aciveMouseover[i] = false;
    }
  }

  ngOnInit(): void {
  }

  onWindowScroll(e: Event): void {
    this.scrolled = ((e.target as Element).firstElementChild as Element).scrollTop;
  }

  scrollToTop(): void {
    window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
    });
  }

  onRightClick(e: Event) {
  e.preventDefault();
}

  prevImageNumber(): number {
    if (this.currentImage > 1) return this.currentImage - 1;
    else return this.g.numberOfImages;
  }

  prevImage(): void {
    this.currentImage = this.prevImageNumber();
  }
  
  nextImageNumber(): number {
    if(this.currentImage < this.g.numberOfImages) return this.currentImage + 1;
    else return 1;
  }

  nextImage(): void {
    this.currentImage = this.nextImageNumber();
  }

  manageSelectOnMouseover(): void {
    this.userSettings.selectOnMouseover = !this.userSettings.selectOnMouseover;
    this.userSettingsService.setSelectOnMouseover(this.userSettings.selectOnMouseover);
  }

  mouseoverImageSelect(i: number): void {
    this.aciveMouseover[i] = true;
    setTimeout(()=>{
      if (this.aciveMouseover[i] && this.userSettings.selectOnMouseover) this.currentImage = i;
    }, 300);
  }

  cancelMouseoverSelect(i: number): void {
    this.aciveMouseover[i] = false;
  }

  onImageOverlayMouseenter(side: number): void {
    this.imageOverlayDisplayed = true;
    if (side == 1) this.mouseoverImageSelect(this.prevImageNumber());
    if (side == 2) this.mouseoverImageSelect(this.nextImageNumber());
  }

  onImageOverlayMouseleave(side: number): void {
    this.imageOverlayDisplayed = false;
    if (side == 1) this.cancelMouseoverSelect(this.prevImageNumber());
    if (side == 2) this.cancelMouseoverSelect(this.nextImageNumber());
  }

}
