import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { FormError, errorMsg } from '../misc/form-errors';
// import { AutenticacionService } from '../../services/autenticacion.service';

import { passwordMatchValidator } from '../misc/form-validators';

import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
})

export class SignupPagePage implements OnInit
{  
  signupForm: FormGroup;
  message:string="";
  
  emailExistsMessage:string = "";

  constructor(
    private form:FormBuilder,
    private dbService:DataBaseService,
    private router: Router
  )
  {
    this.signupForm = this.form.group
    ({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      passwordConfirm: ['',[Validators.required, passwordMatchValidator]],
      tyc: [false, Validators.requiredTrue]
    });
  }

  ngOnInit()
  {
  }

  async ionViewDidEnter()
  {
    // If a session is already active, go directly to the tabs
    if ((await this.dbService.sessionExists()).valueOf())
    {
      console.log("A session already exists");
      this.router.navigate(['/tabs/tab1']);
    }
  }
  
  get btnColor()
  {
    return this.signupForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    return this.signupForm.valid ? 'Crear cuenta' : 'Debes rellenar todos los campos';
  }
  get emailAlreadyExistsMessage()
  {
    return this.emailExistsMessage;
  }

  // Se ejecuta cuando se envía el formulario
  async SignupValidation()
  {
    this.emailExistsMessage = "";

    try
    {
      const signupReturn = await this.dbService.signUp(this.signupForm.value);
      console.log("signup returned = ", signupReturn);

      if (signupReturn)
      {
        console.log("Signed in successfully");
        this.router.navigate(['/tabs/tab1']);
      }
      else
      {
        console.log("This email is already registered or a problem has occurred.");
        this.emailExistsMessage = "Este email ya está en uso!";
      }
    } catch (error) {
      console.error("Signup error: ", error);
    }
  }

  formError(field: string): string | null
  {
    if (this.signupForm.get(field)!.errors)
    {
      const error: FormError = Object.keys(this.signupForm.get(field)!.errors!)[0] as FormError;
      return errorMsg[error];
    }
    
    return null;
  }

}