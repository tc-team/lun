import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private networkStatusCodes: any;
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // Error messages status text
    this.networkStatusCodes = {
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
      505: 'HTTP Version Not Supported',
      506: 'Variant Also Negotiates',
      507: 'Variant Also Negotiates',
      511: 'Network Authentication Required',
      401: '',
      0: 'No internet connection',
    };
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(text: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text });
  }

  error(message: Response, keepAfterNavigationChange = false) {
    const msgFromRequestCode = message.statusText || this.networkStatusCodes[ message.status ];

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: msgFromRequestCode });
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }
}
