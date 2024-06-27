import { Component } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
  }

  get pagadoPer()
  {
    return '79';
  }
  
  get medioPagadoPer()
  {
    return '12';
  }

  get deudaPer()
  {
    return '9';
  }
}
