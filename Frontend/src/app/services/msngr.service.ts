import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MsngrService {

  subject = new Subject()
  subject2 = new Subject()

  constructor() { }

  sendMsg(product: any) {
    this.subject.next(product)
  }

  getMsg() {
    return this.subject.asObservable()
  }

  sendRemoveMsg(product: any) {
    this.subject2.next(product)
  }

  getRemoveMsg() {
    return this.subject2.asObservable()
  }
}
