import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';

import { DefaultGalleries } from './data/galleries-data';

const standardRoutes: Routes = [
  // Main page
  { 
    path: '', 
    component: HomepageComponent,
    pathMatch: 'full'
  },
  // 404 (redirect to main page)
  { 
    path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: () => {
        let routes: Routes = [];

        // Years
        DefaultGalleries.byYears.galleries.forEach(gallery => {
          routes.push({
            path: gallery.path, 
            component: GalleryComponent,
            data: {
              gallery: gallery
            }
          });
        });
        
        // Months 
        DefaultGalleries.byMonths.forEach(year => {
          year.galleries.forEach(gallery => {
            routes.push({
              path: gallery.path, 
              component: GalleryComponent,
              data: {
                gallery: gallery
              }
            });
          })
        });

        // Locations
        DefaultGalleries.byLocations.forEach(group => {
          group.galleries.forEach(gallery => {
            routes.push({
              path: gallery.path, 
              component: GalleryComponent,
              data: {
                gallery: gallery
              }
            });
          })
        });

        // Tags
        DefaultGalleries.byTags.forEach(group => {
          group.galleries.forEach(gallery => {
            routes.push({
              path: gallery.path, 
              component: GalleryComponent,
              data: {
                gallery: gallery
              }
            });
          })
        });

        return [
          ...routes,
          ...standardRoutes
        ];
      },
      multi: true
    }
  ]
})
export class AppRoutingModule { }
