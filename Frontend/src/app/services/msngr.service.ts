import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsngrService {

  subject = new Subject();
  subject2 = new Subject();

  constructor() { }

  sendMsg(menuItem: any): any {
    this.subject.next(menuItem);
  }

  getMsg(): Observable<any> {
    return this.subject.asObservable();
  }

  sendRemoveMsg(menuItem: any): any {
    this.subject2.next(menuItem);
  }

  getRemoveMsg(): Observable<any> {
    return this.subject2.asObservable();
  }
}
