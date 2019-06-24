import { Injectable } from '@angular/core';
export interface Noticealert {
    icon?:string;
    content:string;
    close?: boolean;
    type?:string;
    autoClose?:boolean
    autoCloseDelay?:number
}

@Injectable({ providedIn: 'root' })
export class NoticealertService {
  notice:Noticealert[] = [];

  
  add(notice:Noticealert) {
    this.notice.push(notice);
    if(notice.autoClose){
      setTimeout(()=>{
        this.close(notice);
      },notice.autoCloseDelay)
    }
  }

  clear() {
  }

  close(notice){
    if(this.notice.indexOf(notice) > -1){
		  this.notice.splice(this.notice.indexOf(notice), 1);
    }
  }


}