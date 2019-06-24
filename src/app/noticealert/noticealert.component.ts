import { Component, OnInit } from '@angular/core';
import { NoticealertService } from './noticealert.service';
import { trigger, query, style, animate, transition,stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'notice-alert',
  templateUrl: './noticealert.component.html',
  styleUrls: ['./noticealert.component.scss'],
  animations: [
		trigger('noticeAnimation', [
    		transition('* => *', [
    			query(':enter', style({ opacity: 0}), {optional: true}),

        		query(':enter', stagger('300ms', [
					animate('300ms ease-in', keyframes([
						style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
            			style({opacity: .5, transform: 'translateY(50%)',  offset: 0.5}),
						style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
					]))]), 
					{optional: true}
				),
			
				query(':leave', stagger('300ms', [
					animate('300ms ease-in', keyframes([
						style({opacity: 1, transform: 'translateY(0)', offset: 0}),
						style({opacity: .5, transform: 'translateY(50%)',  offset: 0.5}),
						style({opacity: 0, transform: 'translateY(100%)',     offset: 1.0}),
					]))]), {optional: true}
				),
      		])
		]),
	]
})
export class NoticealertComponent implements OnInit {
  constructor(public noticeService:NoticealertService) { }
  ngOnInit() {
  }
}