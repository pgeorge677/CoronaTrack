import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';

import { FoodDetailsResolver } from './food-details.resolver';
import { FoodService } from './food.service';

import { CategoriesPage } from './categories.page';

const categoriesRoutes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    resolve: {
      data: FoodDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(categoriesRoutes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [ CategoriesPage ],
  providers: [
    FoodDetailsResolver,
    FoodService
  ]
})
export class CategoriesPageModule {}
