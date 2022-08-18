import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationAreaComponent } from './navigation/navigation-area/navigation-area.component';
import { GalleryGroupComponent } from './navigation/gallery-group/gallery-group.component';

import { HomepageComponent } from './homepage/homepage.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationAreaComponent,
    GalleryGroupComponent,
    HomepageComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
