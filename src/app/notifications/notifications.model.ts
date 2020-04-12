import { ShellModel } from '../shell/data-store';

export class NotificationsModel extends ShellModel {

  data: Array<{
    country: string;
    countryInfo: Array<{
        _id: number,
        iso2: string,
        iso3: string,
        lat: string,
        long: number,
        flag: string
      }>;
    cases: string;
    todayCases: string;
    deaths: string;
    todayDeaths: string;
    recovered: string;
    active: string;
    critical: string;
    casesPerOneMillion: string;
    deathsPerOneMillion: string;
    updated: string;
  }>;

  constructor() {
    super();
  }
}
