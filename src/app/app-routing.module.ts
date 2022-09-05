import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';

import { constructGallery as g } from './data/galleries-data';

const routes: Routes = [

  // Main page
  { 
    path: '', 
    component: HomepageComponent,
    pathMatch: 'full'
  },

  // 2017 galleries
  { 
    path: '2017', 
    component: GalleryComponent,
    data: {
      gallery: g('year', ['2017'])
    }
  },
  { 
    path: '2017/01', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '01'])
    }
  },
  { 
    path: '2017/02', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '02'])
    }
  },
  { 
    path: '2017/03', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '03'])
    }
  },
  { 
    path: '2017/05', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '05'])
    }
  },
  { 
    path: '2017/06', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '06'])
    }
  },
  { 
    path: '2017/08', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '08'])
    }
  },
  { 
    path: '2017/10', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '10'])
    }
  },
  { 
    path: '2017/11', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '11'])
    }
  },
  { 
    path: '2017/12', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2017', '12'])
    }
  },

  // 2018 galleries
  { 
    path: '2018', 
    component: GalleryComponent,
    data: {
      gallery: g('year', ['2018'])
    }
  },
  { 
    path: '2018/01', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2018', '01'])
    }
  },
  { 
    path: '2018/09', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2018', '09'])
    }
  },

  // 2019 galleries
  { 
    path: '2019', 
    component: GalleryComponent,
    data: {
      gallery: g('year', ['2019'])
    }
  },
  { 
    path: '2019/01', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2019', '01'])
    }
  },
  { 
    path: '2019/03', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2019', '03'])
    }
  },
  { 
    path: '2019/04', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2019', '04'])
    }
  },

  // 2021 galleries
  { 
    path: '2021', 
    component: GalleryComponent,
    data: {
      gallery: g('year', ['2021'])
    }
  },
  { 
    path: '2021/08', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2021', '08'])
    }
  },
  { 
    path: '2021/09', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2021', '09'])
    }
  },
  { 
    path: '2021/10', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2021', '10'])
    }
  },
  { 
    path: '2021/11', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2021', '11'])
    }
  },
  { 
    path: '2021/12', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2021', '12'])
    }
  },

  // 2022 galleries
  { 
    path: '2022', 
    component: GalleryComponent,
    data: {
      gallery: g('year', ['2022'])
    }
  },
  { 
    path: '2022/01', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2022', '01'])
    }
  },
  { 
    path: '2022/02', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2022', '02'])
    }
  },
  { 
    path: '2022/07', 
    component: GalleryComponent,
    data: {
      gallery: g('month', ['2022', '07'])
    }
  },

  // 404 (redirect to main page)
  { 
    path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
