import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NavigationAreaComponent } from './navigation/navigation-area/navigation-area.component';
import { GalleryGroupComponent } from './navigation/gallery-group/gallery-group.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { GallerySimpleComponent } from './gallery/gallery-simple/gallery-simple.component';
import { SelectedImageBlockComponent } from './gallery/selected-image-block/selected-image-block.component';
import { ImageDataBlockComponent } from './gallery/image-data-block/image-data-block.component';
import { ControlsButtonComponent } from './ui-elements/controls-button/controls-button.component';

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
