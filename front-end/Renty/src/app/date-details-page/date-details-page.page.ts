import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-date-details-page',
  templateUrl: './date-details-page.page.html',
  styleUrls: ['./date-details-page.page.scss'],
})
export class DateDetailsPagePage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  message = '';
  date = '[Date]';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

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
}
