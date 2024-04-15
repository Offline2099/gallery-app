import { Injectable } from '@angular/core';

import { ImageData, DefaultGalleries, GalleryGroup, Gallery } from '../interfaces/data';
import { Timeline, Locations, Tags, GalleryTypes } from '../data/const';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private u: UtilitiesService) { }

  DefaultGalleries: DefaultGalleries = this.constructDefaultGalleries();

  private sortTags(tags: string[]): void {
    let allTagsSorted: string[] = Tags.map(group => group.names).flat();
    tags.sort((a, b) => {
      return allTagsSorted.indexOf(a) - allTagsSorted.indexOf(b);
    });
  }

  private getAllImageData(): ImageData[] {

    let allImageData: ImageData[] = [];
    let imgPath: string;
    let imgData: ImageData;

    Timeline.forEach(y => {
      y.months.forEach(m => {
        Array.from(Array(m.n)).forEach((image, i) => {
          imgPath = `${y.year}/${m.m}/${i + 1}.jpg`;
          imgData = m.d[i];
          if (imgData) {
            imgData.path = imgPath;
            imgData.year = y.year;
            imgData.month = m.m
          }
          else imgData = {path: imgPath, year: y.year, month: m.m};
          if (imgData.tags) this.sortTags(imgData.tags);
          allImageData.push(imgData);
        });
      });
    });

    return allImageData;
  }

  private constructGalleriesByYear(data: ImageData[]): GalleryGroup {
    return {
      name: 'Years',
      path: '',
      galleries: Timeline.map(y => ({
        type: GalleryTypes.year,
        path: y.year,
        name: {
          short: y.year,
          full: `Year ${y.year}`
        },
        images: data.filter(img => img.year == y.year)
      }))
    }
  }

  private constructGalleriesByMonth(data: ImageData[]): GalleryGroup[] {
    return Timeline.slice().reverse().map(y => ({
      name: y.year,
      path: y.year,
      galleries: y.months.map(month => ({
        type: GalleryTypes.month,
        path: `${y.year} ${month.m}`,
        name: {
          short: this.u.monthName(month.m),
          full: `${this.u.monthName(month.m)} ${y.year}`
        },
        images: data.filter(img => img.year == y.year && img.month == month.m)
      }))
    }));
  }

  private constructGalleriesByLocation(data: ImageData[]): GalleryGroup[] {
    return Locations.map(locationGroup => ({
      name: locationGroup.groupName,
      path: '',
      galleries: locationGroup.names.map(location => ({
        type: GalleryTypes.location,
        path: `places/${this.u.strToKebabCase(location)}`,
        name: {
          short: location,
          full: `Location: ${location}`
        },
        images: data
          .filter(img => {
            if (!img.location) return false;
            return (img.location.name == location || img.location.name2 == location);
          })
          .sort((a, b) => {
            let t1 = new Date(`01/${a.month}/${a.year}`).getTime();
            let t2 = new Date(`01/${b.month}/${b.year}`).getTime();
            return  t2 - t1;
          })
      }))
    }));
  }

  private constructGalleriesByTag(data: ImageData[]): GalleryGroup[] {
    return Tags.map(tagGroup => ({
      name: tagGroup.groupName,
      path: '',
      galleries: tagGroup.names.map(tag => ({
        type: GalleryTypes.tag,
        path: `tags/${this.u.strToKebabCase(tag)}`,
        name: {
          short: this.u.capFirstLetter(tag),
          full: `Tag: ${this.u.capFirstLetter(tag)}`
        },
        images: data
          .filter(img => {
            if (!img.tags) return false;
            return img.tags.includes(tag);
          })
          .sort((a, b) => {
            let t1 = new Date(`01/${a.month}/${a.year}`).getTime();
            let t2 = new Date(`01/${b.month}/${b.year}`).getTime();
            return  t2 - t1;
          })
      }))
    }));
  }

  constructDefaultGalleries(): DefaultGalleries {

    let data: ImageData[] = this.getAllImageData();

    return { 
      byYear: this.constructGalleriesByYear(data), 
      byMonth: this.constructGalleriesByMonth(data),
      byLocation: this.constructGalleriesByLocation(data),
      byTag: this.constructGalleriesByTag(data)
    }
  }
}
