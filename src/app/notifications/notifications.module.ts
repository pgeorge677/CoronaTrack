import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';

import { NotificationsPage } from './notifications.page';
import { NotificationsResolver } from '../notifications/notifications.resolver';
import { NotificationsService } from '../notifications/notifications.service';
import { HttpClientModule } from '@angular/common/http';

const notificationsRoutes: Routes = [
  {
    path: '',
    component: NotificationsPage,
    resolve: {
      data: NotificationsResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(notificationsRoutes),
    HttpClientModule
  ],
  declarations: [ NotificationsPage ],
  providers: [
    NotificationsResolver,
    NotificationsService
  ]
})
export class NotificationsPageModule {}
