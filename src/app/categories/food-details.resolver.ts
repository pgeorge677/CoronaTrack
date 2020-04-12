import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FoodService } from './food.service';
import { Observable } from 'rxjs';
import { DataStore } from '../shell/data-store';
import { FoodDetailsModel } from './food-details.model';

@Injectable()
export class FoodDetailsResolver implements Resolve<any> {

  constructor(private foodService: FoodService) {}

  resolve() {

    const dataSource: Observable<FoodDetailsModel> = this.foodService.getAllDataSource();
    const dataStore: DataStore<FoodDetailsModel> = this.foodService.getAllStore(dataSource);

    return dataStore;
  }
}
