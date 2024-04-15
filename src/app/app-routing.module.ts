import { NgModule, inject } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';

import { DataService } from './services/data.service';

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
        let data = inject(DataService);

        // Years
        data.DefaultGalleries.byYears.galleries.forEach(gallery => {
          routes.push({
            path: gallery.path, 
            component: GalleryComponent,
            data: {
              gallery: gallery
            }
          });
        });
        
        // Months 
        data.DefaultGalleries.byMonths.forEach(year => {
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
        data.DefaultGalleries.byLocations.forEach(group => {
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
        data.DefaultGalleries.byTags.forEach(group => {
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
