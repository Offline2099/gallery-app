import { Injectable } from '@angular/core';

import { ImageData, GalleryGroup, DefaultGalleries } from '../interfaces/data';
import { Timeline, Locations, Tags } from '../data/const';
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
        // For each image (in reverse)
        Array.from(Array(m.n)).forEach((image, i) => {
          // Construct image path string
          imgPath = `${y.year}/${m.m}/${m.n - i}.jpg`;
          // If image data object exists: add path, year, month;
          // otherwise: create image data object and add path, year, month
          imgData = m.d[m.n - i - 1];
          if (imgData) {
            imgData.path = imgPath;
            imgData.year = y.year;
            imgData.month = m.m
          }
          else imgData = {path: imgPath, year: y.year, month: m.m};
          // Comb tags if present
          if (imgData.tags) this.sortTags(imgData.tags);
          // Push image data into the data array for all images
          allImageData.push(imgData);
        });
      });
    });

    return allImageData;
  }

  private constructGalleriesByYears(data: ImageData[]): GalleryGroup {

    let gByYears: GalleryGroup = {
      name: "Years",
      nameShort: "Years",
      path: '',
      galleries: Timeline.map(year => ({
        type: 'year',
        numberOfImages: 0,
        path: year.year,
        name: year.year,
        nameExtended: 'Year ' + year.year,
        imageData: data.
          filter(data => data.year == year.year).
          sort((a, b) => {return parseInt(b.month!) - parseInt(a.month!)}).
          reverse()
      }))
    };

    gByYears.galleries.forEach(gallery => 
      gallery.numberOfImages =  gallery.imageData!.length
    );

    return gByYears;
  }

  private constructGalleriesByMonths(data: ImageData[]): GalleryGroup[] {

    let gByMonths: GalleryGroup[] = [];
    let u: UtilitiesService = new UtilitiesService();

    gByMonths = Timeline.map(y => ({
      name: y.year,
      nameShort: y.year,
      path: y.year,
      galleries: y.months.map(month => ({
        type: 'month',
        numberOfImages: 0,
        path: y.year + '/' + month.m,
        name: u.monthName(month.m),
        nameExtended: u.monthName(month.m) + ' ' + y.year,
        imageData: data.
          filter(data => data.year == y.year && data.month == month.m).
          reverse()
      }))
    }));

    gByMonths.forEach(group => 
      group.galleries.forEach(gallery => 
        gallery.numberOfImages = gallery.imageData!.length
      )
    );

    return gByMonths;
  }

  private constructGalleriesByLocations(data: ImageData[]): GalleryGroup[] {

    let gByLocations: GalleryGroup[] = [];
    let u: UtilitiesService = new UtilitiesService();

    gByLocations = Locations.map(locationGroup => ({
      name: locationGroup.groupName,
      nameShort: locationGroup.groupName,
      path: '',
      galleries: locationGroup.names.map(location => ({
        type: 'location',
        numberOfImages: 0,
        path: 'places/' + u.strToKebabCase(location),
        name: location,
        nameExtended: 'Location: ' + location,
        imageData: data.filter(data => {
          if (!data.location) return false;
          return (data.location.name == location || data.location.name2 == location);
        }).reverse()
      }))
    }));

    gByLocations.forEach(group => 
      group.galleries.forEach(gallery => 
        gallery.numberOfImages = gallery.imageData!.length
      )
    );

    return gByLocations;
  }

  private constructGalleriesByTags(data: ImageData[]): GalleryGroup[] {

    let gByTags: GalleryGroup[] = [];
    let u: UtilitiesService = new UtilitiesService();

    gByTags = Tags.map(tagGroup => ({
      name: tagGroup.groupName,
      nameShort: tagGroup.groupName,
      path: '',
      galleries: tagGroup.names.map(tag => ({
        type: 'tag',
        numberOfImages: 0,
        path: 'tags/' + u.strToKebabCase(tag),
        name: u.capFirstLetter(tag),
        nameExtended: 'Tag: ' + u.capFirstLetter(tag),
        imageData: data.filter(data => {
          if (!data.tags) return false;
          return data.tags.includes(tag);
        }).reverse()
      }))
    }));

    gByTags.forEach(group => 
      group.galleries.forEach(gallery => 
        gallery.numberOfImages = gallery.imageData!.length
      )
    );

    return gByTags;
  }

  constructDefaultGalleries(): DefaultGalleries {

    let data: ImageData[] = this.getAllImageData();

    return { 
      byYears: this.constructGalleriesByYears(data), 
      byMonths: this.constructGalleriesByMonths(data),
      byLocations: this.constructGalleriesByLocations(data),
      byTags: this.constructGalleriesByTags(data)
    }
  }
}
