import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../misc/form-validators';
import { FormError, errorMsg } from '../misc/form-errors';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public arriendos: any;
  public arriendosUpdated = false;

  public results: any;

  public arriendoSeleccionado: any;

  constructor(
    private form:FormBuilder,
    private http: HttpClient,
    private dbService:DataBaseService,
    private router:Router
  )
  {
    this.createForm = this.form.group
    ({
      name: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      note: ['']
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

    /*
    this.http.get('../../assets/json/arriendos.json').subscribe(data => {
      this.arriendos = data;
      this.arriendos = this.arriendos.arriendos
      console.log(this.arriendos)
      this.results = [...this.arriendos];
    });
    */

    this.arriendos = await this.dbService.getArriendos();
    if (this.arriendos)
    { 
      //console.log("Promise?", this.arriendos)
      this.results = [...this.arriendos];
    }
    this.arriendosUpdated = true;
  }

  get canReadArriendos()
  {
    return this.arriendosUpdated;
  }
  
  handleInput(event:Event)
  {
    if (event != null)
    {
      const query = (<HTMLTextAreaElement>event.target)?.value.toLowerCase();
      this.results = this.arriendos.filter(
        (o:any) => {
          //console.log(o['nombre'].toString().toLowerCase().indexOf(query));
          return o['nombre'].toString().toLowerCase().indexOf(query) > -1;
        }
      );
    }
  }

  onClickEdit(event:Event, arriendo:any)
  {
    console.log(arriendo.id);
    //arriendo.id;
  }

  getStateColor(state:number)
  {
    switch(state)
    {
      case 0:
        return "success";

      case 1:
        return "warning";
        
      case 2:
        return "danger";
      
      default:
        return "secondary";
    }
  }

  getStateName(state:number)
  {
    //console.log("Function called");
    //console.log(status);
    switch(state)
    {
      case 0:
        return "Pagado";

      case 1:
        return "Por Pagar";
        
      case 2:
        return "Deuda";
      
      default:
        return "Vacío";
    }
  }

  createForm: FormGroup;

  get btnColor()
  {
    return this.createForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    return this.createForm.valid ? 'Añadir' : 'Falta un nombre';
  }

  // Se ejecuta cuando se envía el formulario
  async creationValidation()
  {
    //console.log("Login Form = ",this.signupForm.value);
    //this.nameExistsMessage = "";

    try
    {
      const creteArriendoReturn = await this.dbService.createArriendo(this.createForm.value);
      console.log("Arriendo create returned = ", creteArriendoReturn);

      if (creteArriendoReturn)
      {
        console.log("Arriendo creado successfully");

        this.arriendos = await this.dbService.getArriendos();

        if (this.arriendos)
        { 
          //console.log("Promise?", this.arriendos)
          this.results = [...this.arriendos];
        }

        this.modal.dismiss(this.name, 'confirm');
        this.modal.isOpen = false;
      }
      else
      {
        console.log("This name already exists.");
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
}
