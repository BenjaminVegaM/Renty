import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatetimeChangeEventDetail, DatetimeCustomEvent } from '@ionic/angular';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { DataBaseService } from '../services/data-base.service';

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

  constructor(private dbService:DataBaseService, private router:Router) { }

  async ionViewDidEnter()
  {
    console.log("Current Nav: ", this.router.getCurrentNavigation());

    // If a session NOT active, go directly to the title
    if (!(await this.dbService.sessionExists()).valueOf())
    {
      console.log("No has iniciado sesión.");
      this.router.navigate(['/title-page']);
    }
  }

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
