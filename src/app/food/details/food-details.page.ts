import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoodDetailsModel } from './food-details.model';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: [
    './styles/food-details.page.scss',
    './styles/food-details.shell.scss'
  ]
})
export class FoodDetailsPage implements OnInit {

  details: FoodDetailsModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.details && this.details.isShell);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((resolvedRouteData) => {
      const detailsDataStore = resolvedRouteData['data'];
      console.log(detailsDataStore.cases);
      detailsDataStore.state.subscribe(
        (state) => {
          this.details = state;
          console.log(state);
        },
        (error) => { }
      );
    },
      (error) => { });
  }

}
