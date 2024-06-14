import { Component } from '@angular/core';
import { DatetimeChangeEventDetail, DatetimeCustomEvent } from '@ionic/angular';
//import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  formattedDate = '';

  highlightedDates = [
    {
      date: '2024-06-06',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2024-06-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2024-02-20',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2024-06-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
    },
  ];

  constructor() {}

  onSelectDate(event:Event)
  {
    /*const ev = event as CustomEvent<DatetimeChangeEventDetail>;
    if (typeof ev.detail.value === 'string') {
      this.formattedDate = format(parseISO(ev.detail.value), 'MMM d, yyyy');
    }*/
  }

}
