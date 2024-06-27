import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-boleta-details-page',
  templateUrl: './boleta-details-page.page.html',
  styleUrls: ['./boleta-details-page.page.scss'],
})
export class BoletaDetailsPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  message = '';
  name!: string;

  textConfirm = "Confirmar";
  textCancel = "Cancelar";
  textTitulo = "Nuevo Cobro";
  textPlaceholderNombre = "Nombre";
  textPlaceholderCosto = "Costo";


  get phNombre()
  {
    return this.textPlaceholderNombre;
  }
  get phCosto()
  {
    return this.textPlaceholderCosto;
  }

  cancelEdit()
  {
    this.modal.dismiss(null, 'cancel');
  }

  confirmEdit()
  {
    this.modal.dismiss(this.name, 'confirm');
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
    this.modal.dismiss(null, 'cancel');
  }

  confirmCreate()
  {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismissCreate(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // Here it should rewrite the original data with the new one as it was edited
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onClickEdit(event:Event, name:string)
  {
    console.log(name);
  }

}
