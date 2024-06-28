import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DataBaseService } from '../services/data-base.service';
import { FormError, errorMsg } from '../misc/form-errors';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-boleta-details-page',
  templateUrl: './boleta-details-page.page.html',
  styleUrls: ['./boleta-details-page.page.scss'],
})
export class BoletaDetailsPagePage implements OnInit {
  
  public arriendo: any;
  public boleta: any;
  public cobros: Array<any> = [];
  public cobroUpdated = false;
  
  public results: any;

  hayCobros = false;

  _nombreArriendo = '[Nombre arriendo]';
  _fechaBoleta = '[Nota arriendo]';
  _porcentagePagado = '[Pagado]';
  _porcentageDeuda = '[Deuda]';
  _valorPagado = '[Pagado]';
  _valorDeuda = '[Deuda]';

  constructor(
    private form:FormBuilder,
    private http: HttpClient,
    private dbService:DataBaseService,
    private router:Router
  )
  {
    this.createForm = this.form.group
    ({
      nombre: ['',[Validators.required]],
      valor: [0]
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter()
  {
    this.hayCobros = false;
    this.cobroUpdated = false;
    // If a session NOT active, go directly to the title
    if (!(await this.dbService.sessionExists()).valueOf())
    {
      console.log("No has iniciado sesión.");
      this.router.navigate(['/title-page']);
      return;
    }

    this.arriendo = await this.dbService.getArriendo();

    if (this.arriendo)
    {
      this._nombreArriendo = this.arriendo.nombre;
      this.boleta = await this.dbService.getBoleta();
      
      if (this.boleta)
      {
        this._fechaBoleta = this.boleta.fecha.slice(0, 10);

        await this.UpdateScreenInfo();
      }
    }

    this.cobroUpdated = true;
  }

  private async UpdateScreenInfo() {
    this.cobros = await this.dbService.getCobros();
    console.log("COBROS: ", this.cobros);

    if (this.cobros) {
      var vPagado = 0;
      var vDeuda = 0;
      if (this.cobros.length > 0) {
        this.hayCobros = true;

        this.cobros.forEach(cobro => {
          if (cobro.pagado) vPagado += cobro.valor;
          else vDeuda += cobro.valor;
        });
      }
      var vTotal = vPagado + vDeuda;
      this._valorPagado = vPagado.toString();
      this._valorDeuda = vDeuda.toString();
      this._porcentagePagado = (vPagado / vTotal * 100).toFixed(2).toString();
      this._porcentageDeuda = (vDeuda / vTotal * 100).toFixed(2).toString();
    }
  }

  get canReadBoleta()
  {
    return this.cobroUpdated;
  }

  createForm: FormGroup;

  get btnColor()
  {
    return this.createForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    return this.createForm.valid ? 'Crear' : 'Rellenar datos';
  }

  get nombreArriendo()
  {
    return this._nombreArriendo;
  }
  get fechaBoleta()
  {
    return this._fechaBoleta;
  }
  get porcentagePagado()
  {
    return this._porcentagePagado;
  }
  get porcentageDeuda()
  {
    return this._porcentageDeuda;
  }
  get valorPagado()
  {
    return this._valorPagado;
  }
  get valorDeuda()
  {
    return this._valorDeuda;
  }
  get valorTotal()
  {
    var total:number = +this._valorDeuda + +this._valorPagado;
    return total.toString();
  }
  get getHayBoletas()
  {
    return this.hayCobros;
  }
  getColorPagado(pagado:boolean)
  {
    return pagado ? 'success' : 'danger';
  }
  getIconPagado(pagado:boolean)
  {
    return pagado ? 'checkmark-circle' : 'close-circle';
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
    this.modal.isOpen = false;
  }

  confirmCreate()
  {
    

    this.modal.dismiss(this.name, 'confirm');
    this.modal.isOpen = false;
  }

  onWillDismissCreate(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm')
      {

      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async onClickEdit(event:Event, cobro:any)
  {
    console.log(cobro.pagado);
    try
    { 
      this.dbService.selectedCobro(cobro.id);
      if (cobro.pagado) await this.dbService.despagarCobro();
      else await this.dbService.pagarCobro();
      await this.UpdateScreenInfo();
    }
    catch (error)
    {
      console.error("Creación error: ", error);
    }
  }

  async creationValidation()
  {
    try
    {

      const createCobroReturn = await this.dbService.createCobro(this.createForm.value);
      console.log("Cobro create returned = ", createCobroReturn);

      if (createCobroReturn)
      {
        console.log("Cobro creado successfully");

        await this.UpdateScreenInfo();

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
}
