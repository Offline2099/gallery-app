import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// App
import { AppComponent } from './app.component';

// Navigation Area
import { NavigationAreaComponent } from './components/navigation/navigation-area/navigation-area.component';
import { GalleryGroupComponent } from './components/navigation/gallery-group/gallery-group.component';

// Main Page
import { HomepageComponent } from './components/homepage/homepage.component';

// Gallery Area
import { GalleryAreaComponent } from './components/gallery/gallery-area/gallery-area.component';
import { GallerySettingsComponent } from './components/gallery/gallery-settings/gallery-settings.component';
import { GallerySimpleComponent } from './components/gallery/gallery-simple/gallery-simple.component';
import { SelectedImageBlockComponent } from './components/gallery/selected-image-block/selected-image-block.component';
import { ImageDataBlockComponent } from './components/gallery/image-data-block/image-data-block.component';

// Common UI Elements
import { ControlsButtonComponent } from './components/ui-elements/controls-button/controls-button.component';
import { ScrollToTopButtonComponent } from './components/ui-elements/scroll-to-top-button/scroll-to-top-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationAreaComponent,
    GalleryGroupComponent,
    HomepageComponent,
    GalleryAreaComponent,
    GallerySettingsComponent,
    GallerySimpleComponent,
    SelectedImageBlockComponent,
    ImageDataBlockComponent,
    ControlsButtonComponent,
    ScrollToTopButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
