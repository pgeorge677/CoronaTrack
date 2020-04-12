import { ShellModel } from '../../shell/data-store';
import { TimeLineModel } from './time-line.model';

export class FoodDetailsModel extends ShellModel {

  country: string;
  timeline: TimeLineModel;

  constructor() {
    super();
  }
}
