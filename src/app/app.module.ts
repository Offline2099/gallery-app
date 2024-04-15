import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomepageComponent } from './components/homepage/homepage.component';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { GallerySimpleComponent } from './components/gallery/gallery-simple/gallery-simple.component';

import { NavigationAreaComponent } from './components/ui-elements/navigation-area/navigation-area.component';
import { GalleryGroupComponent } from './components/ui-elements/gallery-group/gallery-group.component';
import { ControlsButtonComponent } from './components/ui-elements/controls-button/controls-button.component';

import { SelectedImageBlockComponent } from './components/gallery/selected-image-block/selected-image-block.component';
import { ImageDataBlockComponent } from './components/gallery/image-data-block/image-data-block.component';


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
