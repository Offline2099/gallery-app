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
        for (let i = 0; i < DefaultGalleries.byYears.galleries.length; i++) {
           routes.push({
            path: DefaultGalleries.byYears.galleries[i].path, 
            component: GalleryComponent,
            data: {
              gallery: DefaultGalleries.byYears.galleries[i]
            }
          });
        }

        // Months 
        for (let i = 0; i < DefaultGalleries.byMonths.length; i++) {
          for (let j = 0; j < DefaultGalleries.byMonths[i].galleries.length; j++) {
            routes.push({
              path: DefaultGalleries.byMonths[i].galleries[j].path,
              component: GalleryComponent,
              data: {
                gallery: DefaultGalleries.byMonths[i].galleries[j]
              }
            });
          }
        }

        // Locations
        for (let i = 0; i < DefaultGalleries.byLocations.length; i++) {
          for (let j = 0; j < DefaultGalleries.byLocations[i].galleries.length; j++) {
            routes.push({
              path: DefaultGalleries.byLocations[i].galleries[j].path,
              component: GalleryComponent,
              data: {
                gallery: DefaultGalleries.byLocations[i].galleries[j]
              }
            });
          }
        }

        // Tags
        for (let i = 0; i < DefaultGalleries.byTags.length; i++) {
          for (let j = 0; j < DefaultGalleries.byTags[i].galleries.length; j++) {
            routes.push({
              path: DefaultGalleries.byTags[i].galleries[j].path,
              component: GalleryComponent,
              data: {
                gallery: DefaultGalleries.byTags[i].galleries[j]
              }
            });
          }
        }

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
