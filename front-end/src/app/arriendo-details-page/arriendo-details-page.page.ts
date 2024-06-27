import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DataBaseService } from '../services/data-base.service';
import { FormError, errorMsg } from '../misc/form-errors';

@Component({
  selector: 'app-arriendo-details-page',
  templateUrl: './arriendo-details-page.page.html',
  styleUrls: ['./arriendo-details-page.page.scss'],
})
export class ArriendoDetailsPagePage implements OnInit {

  public arriendo: any;
  public arriendoUpdated = false;
  
  public results: any;

  _nombreArriendo = '[Nombre arriendo]';
  _notaArriendo = '[Nota arriendo]';
  _porcentagePagado = '[Pagado]';
  _porcentagePorPagar = '[PorPagar]';
  _porcentageDeuda = '[Deuda]';
  _mes = '[Mes]';

  constructor(
    private form:FormBuilder,
    private http: HttpClient,
    private dbService:DataBaseService,
    private router:Router
  )
  {
    this.createForm = this.form.group
    ({
      date: ['',[Validators.required]],
      repetitive: [false]
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter()
  {
    // If a session NOT active, go directly to the title
    if (!(await this.dbService.sessionExists()).valueOf())
    {
      console.log("No has iniciado sesión.");
      this.router.navigate(['/title-page']);
      return;
    }


    this.arriendo = await this.dbService.getArriendo();
    console.log("Arriendo: ", this.arriendo);
    if (this.arriendo)
    {
      this._nombreArriendo = this.arriendo.nombre;
      console.log(this.arriendo.nombre);
      this._notaArriendo = this.arriendo.nota;
      console.log(this.arriendo.nota);
      this._porcentagePagado = 'I';
      this._porcentagePorPagar = 'D';
      this._porcentageDeuda = 'K';
      this._mes = 'MES';

      //console.log("Promise?", this.arriendos)
      //this.results = [...this.arriendo];
    }
    this.arriendoUpdated = true;
  }

  get canReadArriendo()
  {
    return this.arriendoUpdated;
  }

  createForm: FormGroup;

  get btnColor()
  {
    return this.createForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    return this.createForm.valid ? 'Crear' : 'Elegir fecha';
  }

  get nombreArriendo()
  {
    return this._nombreArriendo;
  }
  get notaArriendo()
  {
    return this._notaArriendo;
  }
  get porcentagePagado()
  {
    return this._porcentagePagado;
  }
  get porcentagePorPagar()
  {
    return this._porcentagePorPagar;
  }
  get porcentageDeuda()
  {
    return this._porcentageDeuda;
  }
  get mes()
  {
    return this._mes;
  }
  fechaBoleta(fecha:string)
  {
    return 'LA FECHA';
  }

  // Se ejecuta cuando se envía el formulario
  async creationValidation()
  {
    //console.log("Login Form = ",this.signupForm.value);
    //this.nameExistsMessage = "";

    try
    {

      const createArriendoReturn = await this.dbService.createBoleta(this.createForm.value);
      console.log("Boleta create returned = ", createArriendoReturn);

      if (createArriendoReturn)
      {
        console.log("Boleta creado successfully");
        /*
        this.arriendos = await this.dbService.getArriendos();

        if (this.arriendos)
        { 
          //console.log("Promise?", this.arriendos)
          this.results = [...this.arriendos];
        }
        */

        this.modal.dismiss(this.name, 'confirm');
        this.modal.isOpen = false;
      }
      else
      {
        console.log("Ocurrió un problema.");
        //this.emailExistsMessage = "Este correo ya está en uso!";
      }
    } catch (error) {
      console.error("Creación error: ", error);
    }
  }

  formError(field: string): string | null
  {
    if (this.createForm.get(field)!.errors)
    {
      const error: FormError = Object.keys(this.createForm.get(field)!.errors!)[0] as FormError;
      return errorMsg[error];
    }
    
    return null;
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  name!: string;
  
  cancelCreate()
  {
    this.modal.dismiss(null, 'cancel');
    this.modal.isOpen = false;
  }

  confirmCreate()
  {
    this.modal.dismiss(this.name, 'confirm');
    this.modal.isOpen = false;
  }

  onWillDismissCreate(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // Here it should rewrite the original data with the new one as it was edited
      this.modal.isOpen = false;
    }
  }

  openModalCreate()
  {
    this.modal.isOpen = true;
  }

  prevBoleta()
  {
    this._notaArriendo = "aaaaaaaaaa";
  }
  nextBoleta()
  {

  }
}
