import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStore } from '../shell/data-store';
import { NotificationsService } from './notifications.service';
import { NotificationsModel } from './notifications.model';

@Injectable()
export class NotificationsResolver implements Resolve<any> {

  constructor(private notificationsService: NotificationsService) { }

  resolve() {

    const dataObservable: Observable<NotificationsModel>  = this.notificationsService.getData();
    const dataStore: DataStore<NotificationsModel> = this.notificationsService.getAllData(dataObservable);

    return dataStore;
  }

}
