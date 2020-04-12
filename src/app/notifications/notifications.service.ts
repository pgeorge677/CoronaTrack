import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataStore } from '../shell/data-store';
import { NotificationsModel } from './notifications.model';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {
  constructor(private http: HttpClient) { }

  private detailsDataStore: DataStore<NotificationsModel>;

  public getData(): Observable<any> {
    return this.http.get<any>('https://corona.lmao.ninja/countries')
      .pipe(
          map((details) => {
            const notificationsModel = new NotificationsModel();
            notificationsModel.data = [];
            // this.source = Observable.fromPromise(this.cache.get({src: src.currentValue})).map(v => v.value);
            details.forEach(element => {
              notificationsModel.data.push(element);
            });
            return notificationsModel;
          })
      );
  }

  public getAllData(dataSource: Observable<any>): DataStore<any> {

    // Initialize the model specifying that it is a shell model
    const shellModel: NotificationsModel = new NotificationsModel();
    this.detailsDataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.detailsDataStore.load(dataSource);

    return this.detailsDataStore;
  }
}
