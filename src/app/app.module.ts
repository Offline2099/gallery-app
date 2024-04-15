import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NavigationAreaComponent } from './components/navigation/navigation-area/navigation-area.component';
import { GalleryGroupComponent } from './components/navigation/gallery-group/gallery-group.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { GallerySimpleComponent } from './components/gallery/gallery-simple/gallery-simple.component';
import { SelectedImageBlockComponent } from './components/gallery/selected-image-block/selected-image-block.component';
import { ImageDataBlockComponent } from './components/gallery/image-data-block/image-data-block.component';
import { ControlsButtonComponent } from './components/ui-elements/controls-button/controls-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationAreaComponent,
    GalleryGroupComponent,
    HomepageComponent,
    GalleryComponent,
    ControlsButtonComponent,
    GallerySimpleComponent,
    SelectedImageBlockComponent,
    ImageDataBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
