import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FoodDetailsModel } from './details/food-details.model';
import { DataStore } from '../shell/data-store';
import { TimeLineModel } from './details/time-line.model';

@Injectable()
export class FoodService {

  private detailsDataStore: DataStore<FoodDetailsModel>;

  constructor(private http: HttpClient) { }

  public getDetailDataSource(country: string): Observable<FoodDetailsModel> {
    return this.http.get<FoodDetailsModel>('https://corona.lmao.ninja/v2/historical/' + country);
  }

  public getDetailsDataSource(country: string): Observable<any> {
    return this.http.get<{items: any}>('https://corona.lmao.ninja/v2/historical/' + country)
    .pipe(
      map(( details ) => this.convert(details))
    );
  }

  convert (items: any): FoodDetailsModel {
    const fDM = new FoodDetailsModel();
    fDM.timeline = new TimeLineModel;
    fDM.timeline.cases = [];
    fDM.timeline.deaths = [];
    fDM.timeline.recovered = [];
    fDM.timeline.data = [];

    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        if (key === 'country') {
          fDM.country = element;
        }
        for (const key2 in element) {
          if (element.hasOwnProperty(key2)) {
            if (key2 === 'cases') {
              const cases = element[key2];
              for (const key3 in cases) {
                if (cases.hasOwnProperty(key3)) {
                  const element3 = cases[key3];
                  fDM.timeline.cases.push({ date: key3, number: element3 });
                  const death = this.getDeatchs(items, key3);
                  const recover = this.getRecovered(items, key3);
                  fDM.timeline.data.push({ date: key3, cases: element3, deaths: death, recovered: recover });
                }
              }
            } else if (key2 === 'deaths') {
              const deaths = element[key2];
              for (const key4 in deaths) {
                if (deaths.hasOwnProperty(key4)) {
                  const element4 = deaths[key4];
                  fDM.timeline.deaths.push({ date: key4, number: element4 });
                }
              }
            } else if (key2 === 'recovered') {
              const recovered = element[key2];
              for (const key5 in recovered) {
                if (recovered.hasOwnProperty(key5)) {
                  const element5 = recovered[key5];
                  fDM.timeline.recovered.push({ date: key5, number: element5 });
                }
              }
            }
          }
        }
      }
    }
    console.log(fDM);
    fDM.timeline.data.reverse();
    return fDM;
  }

  private getDeatchs(items: any, date: any): any {
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        for (const key2 in element) {
          if (element.hasOwnProperty(key2)) {
            if (key2 === 'deaths') {
              const deaths = element[key2];
              for (const key4 in deaths) {
                if (deaths.hasOwnProperty(key4)) {
                  const element4 = deaths[key4];
                  if (date === key4) {
                    return element4;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  private getRecovered(items: any, date: any): any {
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        for (const key2 in element) {
          if (element.hasOwnProperty(key2)) {
            if (key2 === 'recovered') {
              const deaths = element[key2];
              for (const key4 in deaths) {
                if (deaths.hasOwnProperty(key4)) {
                  const element4 = deaths[key4];
                  if (date === key4) {
                    return element4;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  public getDetailsStore(dataSource: Observable<any>): DataStore<any> {

    // Initialize the model specifying that it is a shell model
    const shellModel: FoodDetailsModel = new FoodDetailsModel();
    this.detailsDataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.detailsDataStore.load(dataSource);

    return this.detailsDataStore;
  }


}
