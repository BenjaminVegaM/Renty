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
}
