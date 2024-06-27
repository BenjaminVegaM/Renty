import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../misc/form-validators';
import { RegionesService } from '../misc/regiones.service';
import { IonModal } from '@ionic/angular';
import { FormError, errorMsg } from '../misc/form-errors';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  @ViewChild('regionDropdown', { static: false }) regionDropdown?: ElementRef;
  editForm: FormGroup;

  emailExistsMessage:string = "";

  constructor(
    private form:FormBuilder,
    private regionService: RegionesService,
    private userService:DataBaseService,
    private router: Router
  )
  {
    this.editForm = this.form.group
    ({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      passwordConfirm: ['',[Validators.required, passwordMatchValidator]]
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter()
  {
    // If a session NOT active, go directly to the title
    if (!(await this.userService.sessionExists()).valueOf())
    {
      console.log("You need to use an account.");
      this.router.navigate(['/title-page']);
    }
  }

  logOut()
  {
    this.userService.logOut();
    console.log("Logged out successfully");
    this.router.navigate(['/title-page']);
  }

  get btnColor()
  {
    return this.editForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    return this.editForm.valid ? 'Modificar' : 'Debes rellenar todos los campos';
  }
  get emailAlreadyExistsMessage()
  {
    return this.emailExistsMessage;
  }

  // Se ejecuta cuando se envía el formulario
  async modificationValidation()
  {
    //console.log("Login Form = ",this.signupForm.value);
    this.emailExistsMessage = "";

    try
    {
      const modReturn = await this.userService.modifyAccount(this.editForm.value);
      console.log("mod returned = ", modReturn);

      if (modReturn)
      {
        console.log("Modified successfully");
        this.modal.dismiss(this.name, 'confirm');
        this.modal.isOpen = false;
      }
      else
      {
        console.log("This email is already registered.");
        this.emailExistsMessage = "Este correo ya está en uso!";
      }
    } catch (error) {
      console.error("Modification error: ", error);
    }
  }

  formError(field: string): string | null
  {
    if (this.editForm.get(field)!.errors)
    {
      const error: FormError = Object.keys(this.editForm.get(field)!.errors!)[0] as FormError;
      return errorMsg[error];
    }
    
    return null;
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  name!: string;
  
  cancelEdit()
  {
    this.modal.dismiss(null, 'cancel');
    this.modal.isOpen = false;
  }

  confirmEdit()
  {
    this.modal.dismiss(this.name, 'confirm');
    this.modal.isOpen = false;
  }

  onWillDismissEdit(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // Here it should rewrite the original data with the new one as it was edited
      this.modal.isOpen = false;
    }
  }

  openModal()
  {
    this.modal.isOpen = true;
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'ELIMINAR',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  async confirmDelete(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    if (ev.detail.role == 'confirm')
    {
      console.log("Do the deletion");
      const deleteReturn = await this.userService.deleteAccount();
      if (deleteReturn)
      {
        console.log("Deleted successfully");
        this.router.navigate(['/title-page']);
      }
    }
  }
}
