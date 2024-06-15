import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-arriendo-details-page',
  templateUrl: './arriendo-details-page.page.html',
  styleUrls: ['./arriendo-details-page.page.scss'],
})
export class ArriendoDetailsPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(IonModal)
  editModal!: IonModal;
  createModal!: IonModal;

  message = '';
  name!: string;

  cancelEdit()
  {
    this.editModal.dismiss(null, 'cancel');
  }

  confirmEdit()
  {
    this.editModal.dismiss(this.name, 'confirm');
  }

  onWillDismissEdit(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // Here it should rewrite the original data with the new one as it was edited
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  cancelCreate()
  {
    this.createModal.dismiss(null, 'cancel');
  }

  confirmCreate()
  {
    this.createModal.dismiss(this.name, 'confirm');
  }

  onWillDismissCreate(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // Here it should rewrite the original data with the new one as it was edited
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
