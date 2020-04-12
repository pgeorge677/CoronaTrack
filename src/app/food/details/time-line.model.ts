
export class TimeLineModel {

  cases: Array<{
    date: string,
    number: any
  }>;
  deaths: Array<{
    date: string,
    number: any
  }>;
  recovered: Array<{
    date: string,
    number: any
  }>;
  data: Array<{
    date: string,
    cases: any,
    deaths: any,
    recovered: any
  }>;

}
