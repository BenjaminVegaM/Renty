import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
//import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  
  private loggedIn:boolean = false;
  private token = '';
  private loggedUserID = -1;
  private arriendoID = -1;
  private boletaID = -1;
  private cobroID = -1;
  
  private apiDirection:string = 'http://localhost:5002/';
  private usuarioRoute:string = 'usuario/';
  private arriendoRoute:string = 'arriendo/';
  private boletaRoute:string = 'boleta/';
  private cobroRoute:string = 'cobro/';
  private eventoRoute:string = 'evento/';
  private clienteRoute:string = 'cliente/';

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
  
  async getListaArriendos(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.arriendoRoute + 'getListaArriendos', { headers: this.httpHeader }));
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

  async getArriendo(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {

      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.arriendoRoute + 'getArriendo', { headers: this.httpHeader }));
      //console.log("Data Arriendo: ", data);
      return data.arriendo;
    }
    catch (error)
    {
      console.error("Error: ", error);
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
      console.error("Error: ", error);
      return null;
    }
  }

  selectedArriendo(id:number)
  {
    this.arriendoID = id;
    this.httpHeader = this.httpHeader.set('arriendoID', id.toString());
  }

  /*
    Boleta
  */

  async createBoleta(body:any): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      body.arriendoID = this.arriendoID;
      const data = await firstValueFrom<any>(this.http.post(this.apiDirection + this.boletaRoute + 'crear', body, { headers: this.httpHeader }));
      if (data && data.boletas)
      {
        // Guardar los datos o algo en el json quizá
      }
      return data;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  async getBoletas(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {

      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.boletaRoute + 'getBoletas', { headers: this.httpHeader }));
      return data.boletas;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  async getBoleta(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.boletaRoute + 'getBoleta', { headers: this.httpHeader }));
      return data.boleta;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  selectedBoleta(id:number)
  {
    this.boletaID = id;
    this.httpHeader = this.httpHeader.set('boletaID', id.toString());
  }

  /*
    Cobro
  */

  async createCobro(body:any): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      body.boletaID = this.boletaID;
      const data = await firstValueFrom<any>(this.http.post(this.apiDirection + this.cobroRoute + 'crear', body, { headers: this.httpHeader }));
      if (data && data.cobros)
      {
        // Guardar los datos o algo en el json quizá
      }
      return data;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  async getCobros(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {

      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.cobroRoute + 'getCobros', { headers: this.httpHeader }));
      return data.cobros;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  async getCobro(): Promise<any>
  {
    if (!this.loggedIn)
    {
      console.error("Error: Not logged in");
      return null;
    }

    try
    {
      const data = await firstValueFrom<any>(this.http.get(this.apiDirection + this.cobroRoute + 'getCobro', { headers: this.httpHeader }));
      return data.cobro;
    }
    catch (error)
    {
      console.error("Error: ", error);
      return null;
    }
  }

  async cambiarEstadoCobro(currentState:boolean): Promise<any>
  {
    if (!this.loggedIn)
      {
        console.error("Error: Not logged in");
        return null;
      }
  
      try
      {
        var data:any;
        if (currentState) data = await firstValueFrom<any>(this.http.put(this.apiDirection + this.cobroRoute + 'despagarCobro', { headers: this.httpHeader }));
        else data = await firstValueFrom<any>(this.http.put(this.apiDirection + this.cobroRoute + 'pagarCobro', { headers: this.httpHeader }));
        if (data && data.cobros)
        {
          // Guardar los datos o algo en el json quizá
        }
        return data;
      }
      catch (error)
      {
        console.error("Error: ", error);
        return null;
      }
  }

  selectedCobro(id:number)
  {
    this.cobroID = id;
    this.httpHeader = this.httpHeader.set('cobroID', id.toString());
  }

  /*
    Cliente
  */   

  /*
    Evento
  */    

}
