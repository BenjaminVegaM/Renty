import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormError, errorMsg } from '../misc/form-errors';
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  loginForm: FormGroup;
  wrongLoginMessage:string = "";

  constructor(
    private form:FormBuilder,
    private dbService:DataBaseService,
    private router: Router
  )
  {
    this.loginForm = this.form.group
    ({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
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
    return this.loginForm.valid ? 'primary' : 'tertiary';
  }
  get btnText()
  {
    //return this.loginForm.valid ? 'Sign Up!' : 'You must fill all the fields';
    return 'Log In';
  }
  get cantLoginMessage()
  {
    return this.wrongLoginMessage;
  }

  async LoginValidation()
  {
    this.wrongLoginMessage = "";

    try
    {
      const loginReturn = await this.dbService.logIn(this.loginForm.value);
      //console.log("Login returned = ", loginReturn);

      if (loginReturn)
      {
        console.log("Logged in successfully");
        this.router.navigate(['/tabs/tab1']);
      }
      else
      {
        console.log("Account does not exist or the data is wrong.");
        this.wrongLoginMessage = "La cuenta no existe o los datos son incorrectos.";
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
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
