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
  loggedUserID = -1;
  
  apiDirection:string = 'http://localhost:5002/';
  usuarioRoute:string = 'usuario/';
  arriendoRoute:string = 'arriendo/';
  boletaRoute:string = 'boleta/';
  cobroRoute:string = 'cobro/';
  eventoRoute:string = 'evento/';
  clienteRoute:string = 'cliente/';

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
        this.loggedUserID = data.user.id;
        this.httpHeader = this.httpHeader.set('token', this.token);
      }
      return data;
    }
    catch (error)
    {
      console.error("Error in Log In: ", error);
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
        this.httpHeader = this.httpHeader.set('token', this.token);
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
    if (!this.loggedIn)
    {
      console.error("Error in Modify Account: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.put(this.apiDirection + this.usuarioRoute + 'modifyAccount', body, { headers: this.httpHeader }));
      if (data && data.token)
      {
        this.loggedIn = true;
        this.token = data.token.token;
        //await this.storage.set('loggedIn', true);
        //await this.storage.set('token', data.token);
        this.httpHeader = this.httpHeader.set('token', this.token);
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
      console.error("Error in delete account: Not logged in");
      return null;
    }

    try
    {
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
    Arriendo
  */
  async getArriendos(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.arriendoRoute + 'getArriendos', { headers: this.httpHeader }));
      if (data)
      {
        // Guardar los datos o algo en el json quizá
        //console.log(data.arriendos);
      }
      return data.arriendos;
    }
    catch (error)
    {
      console.error("Error in Sign Up: ", error);
      return null;
    }
  }

  async createArriendo(body:Object): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.post(this.apiDirection + this.arriendoRoute + 'crear', body, { headers: this.httpHeader }));
      if (data && data.arriendo)
      {
        // Guardar los datos o algo en el json quizá
      }
      return data;
    }
    catch (error)
    {
      console.error("Error in Sign Up: ", error);
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

}
