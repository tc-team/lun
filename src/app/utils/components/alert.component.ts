import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('newState', [
      state('in', style({transform: 'translateY(-100%)'})),
      state('inactive', style({transform: 'translateY(-100%)'})),
      state('active', style({transform: 'translateY(0)'})),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms 3s ease-out'))
    ])
  ]
})

export class AlertComponent implements OnInit {
  state: string;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(
      (message) => {
        if ( !message ) {
          return this.updateNotification(message);
        }

        return this.clearNotification();
      }
    );
  }

  public clearNotification() {
    this.state = 'inactive';
  }

  public updateNotification(message){
    this.state = 'active';
    this.message = message;
  }

}
