import { Component } from '@angular/core';
import { DatetimeChangeEventDetail, DatetimeCustomEvent } from '@ionic/angular';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

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
      textColor: 'var(--ion-color-danger-contrast)',
      backgroundColor: 'var(--ion-color-danger)',
    },
    {
      date: '2024-06-10',
      textColor: 'var(--ion-color-success-contrast)',
      backgroundColor: 'var(--ion-color-success)',
    },
    {
      date: '2024-05-20',
      textColor: 'var(--ion-color-success-contrast)',
      backgroundColor: 'var(--ion-color-success)',
    },
    {
      date: '2024-06-19',
      textColor: 'var(--ion-color-warning-contrast)',
      backgroundColor: 'var(--ion-color-warning)',
    },
    {
      date: '2024-07-10',
      textColor: 'var(--ion-color-success-contrast)',
      backgroundColor: 'var(--ion-color-success)',
    },
    {
      date: '2024-06-20',
      textColor: 'var(--ion-color-success-contrast)',
      backgroundColor: 'var(--ion-color-success)',
    },
    {
      date: '2024-07-20',
      textColor: 'var(--ion-color-warning-contrast)',
      backgroundColor: 'var(--ion-color-warning)',
    },
  ];

  constructor() {}

  onSelectDate(event:Event)
  {
    const ev = event as CustomEvent<DatetimeChangeEventDetail>;
    
    if (typeof ev.detail.value === 'string') {
      this.formattedDate = format(parseISO(ev.detail.value), 'MMM d, yyyy');
    }
    
    console.log(ev.detail.value);
    console.log(this.formattedDate);
  }

}
