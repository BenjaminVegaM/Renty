import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormError, errorMsg } from '../misc/form-errors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  loginForm: FormGroup;

  constructor(private form:FormBuilder)
  {
    this.loginForm = this.form.group
    ({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
  }


  ngOnInit() {
  }
  get btnColor()
  {
    return this.loginForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    //return this.loginForm.valid ? 'Sign Up!' : 'You must fill all the fields';
    return 'Log In';
  }

  LoginValidation()
  {
    //Aquí se debería de aplicar la validación de usuario ya existente
    console.log(this.loginForm.value)

    /*
    if(this.signupForm.get("user")?.value=='pepito' && this.signupForm.get("password")?.value=='123')
    {
      this.message="user esite";
    }
    */

/* 
    this.servicio.IniciarSesion(this.signupForm.get("user")?.value,this.signupForm.get("password")?.value).subscribe(data=>{
       console.log(data);
    });
*/
  }

  formError(field: string): string | null
  {
    if (this.loginForm.get(field)!.errors)
    {
      const error: FormError = Object.keys(this.loginForm.get(field)!.errors!)[0] as FormError;
      return errorMsg[error];
    }
    
    return null;
  }
}
