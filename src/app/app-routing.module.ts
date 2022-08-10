import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { GalleryComponent } from './gallery/gallery.component';

import * as G from './data/galleries-data';

const routes: Routes = [

  // Main page
  { path: '', 
    component: HomepageComponent,
    pathMatch: 'full'
  },

  // 2018 galleries
  { path: '2018/01', 
    component: GalleryComponent,
    data: {
      gallery: G.Jan2018
    }
  },
  { path: '2018/09', 
    component: GalleryComponent,
    data: {
      gallery: G.Sep2018
    }
  },

  // 2019 galleries
  { path: '2019/01', 
    component: GalleryComponent,
    data: {
      gallery: G.Jan2019
    }
  },
  { path: '2019/03', 
    component: GalleryComponent,
    data: {
      gallery: G.Mar2019
    }
  },
  { path: '2019/04', 
    component: GalleryComponent,
    data: {
      gallery: G.Apr2019
    }
  },

  // 2021 galleries
  { path: '2021/08', 
    component: GalleryComponent,
    data: {
      gallery: G.Aug2021
    }
  },
  { path: '2021/09', 
    component: GalleryComponent,
    data: {
      gallery: G.Sep2021
    }
  },
  { path: '2021/10', 
    component: GalleryComponent,
    data: {
      gallery: G.Oct2021
    }
  },
  { path: '2021/11', 
    component: GalleryComponent,
    data: {
      gallery: G.Nov2021
    }
  },
  { path: '2021/12', 
    component: GalleryComponent,
    data: {
      gallery: G.Dec2021
    }
  },

  // 2022 galleries
  { path: '2022/01', 
    component: GalleryComponent,
    data: {
      gallery: G.Jan2022
    }
  },
  { path: '2022/02', 
    component: GalleryComponent,
    data: {
      gallery: G.Feb2022
    }
  },
  { path: '2022/07', 
    component: GalleryComponent,
    data: {
      gallery: G.Jul2022
    }
  },

  // 404 (redirect to main page)
  { path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
