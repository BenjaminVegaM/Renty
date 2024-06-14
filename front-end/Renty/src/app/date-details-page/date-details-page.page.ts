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
}
