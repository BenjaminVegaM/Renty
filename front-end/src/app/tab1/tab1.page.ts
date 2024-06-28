import { Component } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  _porPagado = '';
  _porPorPagar = '';
  _porDeuda = '';

  constructor(private dbService:DataBaseService, private router:Router) { }

  async ionViewDidEnter()
  {
    console.log("Current Nav: ", this.router.getCurrentNavigation());

    // If a session NOT active, go directly to the title
    if (!(await this.dbService.sessionExists()).valueOf())
    {
      console.log("No has iniciado sesión.");
      this.router.navigate(['/title-page']);
    }

    const data = await this.dbService.getEstadisticasGenerales();
    console.log(data);

    if (data && data.data)
    {
      var arrTodoPagado = data.data.todo_pagado;
      var arrMixtoPagado = data.data.mixto;
      var arrNadaPagado = data.data.todo_sin_pagar;
      var arrTotales = arrTodoPagado + arrMixtoPagado + arrNadaPagado;
      this._porPagado = (arrTodoPagado / arrTotales * 100).toFixed(2).toString();
      this._porPorPagar = (arrMixtoPagado / arrTotales * 100).toFixed(2).toString();
      this._porDeuda = (arrNadaPagado / arrTotales * 100).toFixed(2).toString();
    }
  }

  private updateScreenData()
  {

  }

  get pagadoPer()
  {
    return this._porPagado;
  }
  
  get medioPagadoPer()
  {
    return this._porPorPagar;
  }

  get deudaPer()
  {
    return this._porDeuda;
  }
}
