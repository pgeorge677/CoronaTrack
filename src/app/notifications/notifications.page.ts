import { Component, OnInit, HostBinding, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsModel } from './notifications.model';
import { ImageCache } from 'capacitor-image-cache';
import { log } from 'util';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: [
    './styles/notifications.page.scss',
    './styles/notifications.shell.scss'
  ]
})

export class NotificationsPage implements OnInit, AfterContentInit {
  notifications: NotificationsModel;
  searchbar;
  items = [];
  cache = new ImageCache();

  @HostBinding('class.is-shell') get isShell() {
    return (this.notifications && this.notifications.isShell);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(resolvedRouteData => {
      const dataSource = resolvedRouteData['data'];
      dataSource.state.subscribe(
        (state) => {
          const data = this.sortData(state);
          this.notifications = this.checkFlagCache(data);
          console.log(state);
          // console.log(this.sortData);
        },
        (error) => { }
      );
    },
      (error) => { });
  }

  checkFlagCache(data: any): NotificationsModel {
    if (data) {
      data.forEach(async element => {
        const flagCache = await this.cache.get({ src: element.countryInfo.flag });
        element.countryInfo.flag = flagCache.value;
      });
      return data;
    } else {
      return null;
    }
  }

  sortData(data: NotificationsModel): any {
    console.log(data);
    if (data.data != null) {
      return data.data.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    } else {
      return null;
    }
  }

  ngAfterContentInit(): void {
    this.searchbar = document.querySelector('ion-searchbar');
    this.searchbar.addEventListener('ionInput', this.handleInput);
  }

  handleInput(event) {
    this.items = Array.from(document.querySelector('ion-item-group').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

}
