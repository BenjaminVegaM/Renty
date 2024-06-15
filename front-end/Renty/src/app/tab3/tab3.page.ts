import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  arriendos: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('../../assets/json/arriendos.json').subscribe(data => {
      this.arriendos = data;
      console.log(this.arriendos)
    });
  }
}
