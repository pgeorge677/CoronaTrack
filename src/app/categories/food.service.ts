import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FoodDetailsModel } from './food-details.model';
import { DataStore } from '../shell/data-store';

@Injectable()
export class FoodService {

  private detailsDataStore: DataStore<FoodDetailsModel>;

  constructor(private http: HttpClient) { }

  public getAllDataSource(): Observable<any> {
   // return this.http.get<{any}>('https://corona.lmao.ninja/all');// Obsoleta
   // Nuea Version Habilitada
   return this.http.get<{any}>('https://corona.lmao.ninja/v2/all');
  }

  public getAllStore(dataSource: Observable<FoodDetailsModel>): DataStore<FoodDetailsModel> {

    // Initialize the model specifying that it is a shell model
    const shellModel: FoodDetailsModel = new FoodDetailsModel();
    this.detailsDataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.detailsDataStore.load(dataSource);

    return this.detailsDataStore;
  }
}
