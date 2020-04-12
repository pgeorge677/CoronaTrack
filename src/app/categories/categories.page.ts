import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodDetailsModel } from './food-details.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: [
    './styles/categories.page.scss',
    './styles/categories.shell.scss',
    './styles/categories.responsive.scss',
    './styles/food-details.page.scss',
    './styles/food-details.shell.scss'
  ]
})
export class CategoriesPage implements OnInit {
  recipe: FoodDetailsModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.recipe && this.recipe.isShell);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((resolvedRouteData) => {
      const detailsDataStore = resolvedRouteData['data'];
      detailsDataStore.state.subscribe(
        (state) => {
          this.recipe = state;
        },
        (error) => { }
      );
    },
      (error) => { });
  }

}
