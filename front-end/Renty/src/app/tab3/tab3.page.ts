import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public arriendos: any;

  public results: any;

  public arriendoSeleccionado: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('../../assets/json/arriendos.json').subscribe(data => {
      this.arriendos = data;
      console.log(this.arriendos)
      this.results = [...this.arriendos.arriendos];
    });
  }

  handleInput(event:Event)
  {
    if (event != null)
    {
      const query = (<HTMLTextAreaElement>event.target)?.value.toLowerCase();
      this.results = this.arriendos.arriendos.filter(
        (o:any) => {
          //console.log(o['nombre'].toString().toLowerCase().indexOf(query));
          return o['nombre'].toString().toLowerCase().indexOf(query) > -1;
        }
      );
    }
  }

  onClickEdit(event:Event, arriendo:any)
  {
    console.log(arriendo);
    this.arriendoSeleccionado = arriendo;
  }

  getStateColor(estado:string)
  {
    console.log("Function called");
    console.log(estado);
    if (estado.toLowerCase() == "pagado") return "success";
    else if (estado.toLowerCase() == "medio pagado") return "warning";
    else if (estado.toLowerCase() == "deuda") return "danger";
    else return "secondary";
  }

  changeState(estado:string)
  {
    if (estado.toLowerCase() == "seguro") console.log("Cambiando a peligro");
    else if (estado.toLowerCase() == "en peligro") console.log("Cambiando a grave");
    else if (estado.toLowerCase() == "grave") console.log("Cambiando a seguro");
  }
}
