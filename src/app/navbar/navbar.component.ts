import { Component, OnInit, Input, ApplicationModule } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
@Input() appName;
  appSettings = localStorage.getItem("appSett")?JSON.parse(localStorage.getItem("appSett")):{settings: {stepMinute:10}};
  constructor() {}
  /**
   * setStepMinute
   */
  setStepMinute(min){
    this.appSettings = {settings:{stepMinute:min}}
    localStorage.setItem("appSett", JSON.stringify(this.appSettings));
    window.location.reload();
  }
  ngOnInit() {

  }
}