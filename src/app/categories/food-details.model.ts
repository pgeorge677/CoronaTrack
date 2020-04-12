import { ShellModel } from '../shell/data-store';

export class FoodDetailsModel extends ShellModel {

  cases: string;
  deaths: string;
  recovered: string;
  updated: string;
  active: string;

  constructor() {
    super();
  }
}
