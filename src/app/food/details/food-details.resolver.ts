import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FoodService } from '../food.service';
import { Observable } from 'rxjs';
import { DataStore } from '../../shell/data-store';

@Injectable()
export class FoodDetailsResolver implements Resolve<any> {

  constructor(private foodService: FoodService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const itemCountry = route.paramMap.get('productId');

    const dataSource: Observable<any> = this.foodService.getDetailsDataSource(itemCountry);
    const dataStore: DataStore<any> = this.foodService.getDetailsStore(dataSource);

    return dataStore;
  }
}
