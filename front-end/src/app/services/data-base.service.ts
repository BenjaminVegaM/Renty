import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
//import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  
  loggedIn:boolean = false;
  token = '';
  
  apiDirection:string = 'http://localhost:5002/';
  usuarioRoute:string = 'usuario/';
  boletaRoute:string = 'boleta/';
  clienteRoute:string = 'cliente/';
  cobroRoute:string = 'cobro/';
  eventoRoute:string = 'evento/';
  propiedadRoute:string = 'propiedad/';

  httpHeader: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  async ngOnInit()
  {
  }

  /*
    Usuario
  */

  async sessionExists()
  {
    return this.loggedIn;
  }

  async logIn(body:Object): Promise<any>
  {
    try
    {
      const data = await firstValueFrom<any>(this.http.post(this.apiDirection + this.usuarioRoute + 'login', body));
      if (data && data.token)
      {
        this.loggedIn = true;
        this.token = data.token.token;
        this.httpHeader = this.httpHeader.append('token', this.token);
      }
      return data;
    }
    catch (error)
    {
      console.error("Error in logIn: ", error);
      return null;
    }
  }

  async logOut(): Promise<any>
  {
    this.loggedIn = false;
    this.token = '';
  }

  async signUp(body:Object): Promise<any>
  {
    try
    {
      const data = await firstValueFrom<any>(this.http.post(this.apiDirection + this.usuarioRoute + 'signUp', body));
      if (data && data.token)
        {
          this.loggedIn = true;
          this.token = data.token.token;
          this.httpHeader = this.httpHeader.append('token', this.token);
        }
      return data;
    }
    catch (error)
    {
      console.error("Error in Sign Up: ", error);
      return null;
    }
  }

  async modifyAccount(body:Object): Promise<any>
  {
    try
    {
      const data = await firstValueFrom<any>(this.http.put(this.apiDirection + this.usuarioRoute + 'modifyAccount', body, { headers: this.httpHeader }));
      if (data && data.token)
      {
        this.loggedIn = true;
        this.token = data.token.token;
        //await this.storage.set('loggedIn', true);
        //await this.storage.set('token', data.token);
        this.httpHeader = this.httpHeader.append('token', this.token);
      }
      return data;
    }
    catch (error)
    {
      console.error("Error in Modify Account: ", error);
      return null;
    }
  }
  
  async deleteAccount(): Promise<any>
  {
    //console.log("Deleting account");
    if (!this.loggedIn)
    {
      console.error("Error in get user: Not logged in");
      return null;
    }

    try
    {
      console.log("Getting user from token");      
      const userData = await firstValueFrom<any>(this.http.delete(this.apiDirection + this.usuarioRoute + 'deleteAccount', { headers: this.httpHeader } ));
      console.log("Del Data: ", userData);

      this.logOut();

      return userData.response;
    }
    catch (error)
    {
      console.error("Error in delete account: ", error);
      return null;
    }
  }

  /*
    Boleta
  */

  /*
    Cliente
  */

  /*
    Cobro
  */

  /*
    Evento
  */

  /*
    Propiedad
  */


}
