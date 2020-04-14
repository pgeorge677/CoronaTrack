import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe
  ],
  exports: [
    TimeDifferencePipe,
    TimeAgoPipe
  ],
  entryComponents: [],
})
export class PipesModule {}
