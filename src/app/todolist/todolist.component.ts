import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NoticealertService } from '../noticealert/noticealert.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  animations: [
    trigger('translateY', [
      transition('void=> *', [style({transform: 'translateY(300px)'}),
        animate('200ms ease-out', keyframes([
          style({transform: 'translateY(-56px)'}),
          style({transform: 'translateY(0)'})

      ]))]),
      transition('*=>void', [style({transform: 'translateY(0px)'}),
        animate('250ms ease-in',   keyframes([
          style({transform: 'translateY(-56px)', opacity: 1, offset: 0.2}),
          style({transform: 'translateY(100%)', opacity: 0 , offset: 1})

      ]))])

    ]),
    trigger('showHide', [
      transition('void=> *', [style({opacity: 0}),
        animate('300ms ease-out', keyframes([
          style({opacity: 0}),
          style({opacity: 1})

      ]))]),
      transition('*=>void', [style({opacity: 1}),
        animate('350ms ease-in',   keyframes([
          style({opacity: 1,offset: 0.2}),
          style({opacity: 0.5, offset: 0.5}),
          style({opacity: 0,height:'0',transform:'translateY(100%)',offset: 1})

      ]))])

    ])

  ]
})
export class TodolistComponent implements OnInit {
  data = localStorage.getItem("dailyTask")?JSON.parse(localStorage.getItem("dailyTask")):{todo: []};
  appSettings = localStorage.getItem("appSett")?JSON.parse(localStorage.getItem("appSett")):{settings: {stepMinute:10}};
  today:Date = new Date();
  newTask:string;
  time:Date;
  stepMinute;
  constructor(
    private datePipe:DatePipe,
    private noticeService:NoticealertService
  ){}
  
  /**
   * updateDataStorage()
   */
  updateDataStorage(){
    localStorage.setItem("dailyTask", JSON.stringify(this.data));
  }
  /**
   * addTask()
   */
	addTask(task){
    var duplicateTask = false;
    var noTask = false;
		//Check for duplicate task
		for(let i=0;i<this.data.todo.length;i++){
			if(this.data.todo[i].title == task){
        this.noticeService.add({
					content: `You already have this task "${task}" `,
					icon: 'warning',
					autoClose:true, 
					close:true,
					autoCloseDelay:3000,
					type:'error'
        });
        duplicateTask = true;
			}
    }
		if(!task){
      this.noticeService.add({
        content: `Please type new task" ${task} `,
        icon: 'warning',
        autoClose:true, 
        close:true,
        autoCloseDelay:3000,
        type:'error'
      });
      noTask = true;
    }
    //add new task
    if(!duplicateTask && !noTask){
      this.data.todo.push({id:this.data.todo.length+1,title:task,completed:false});
      this.newTask = '';
      this.updateDataStorage();
      this.noticeService.add({
        content: `New task has been added successfully`,
        icon: 'done',
        autoClose:true, 
        close:true,
        autoCloseDelay:3000,
        type:'success'
      });
      this.sortTask();
    }
  }

  /**
   * checkTask()
   */
	checkTask(item) {
		item.completed = true;
		this.updateDataStorage();
  }
  /**
   * uncheckTask()
   */
	uncheckTask(item){
    item.completed = false;
		this.updateDataStorage();
	}
  
  /**
   * removeTask()
   */
	removeTask(task) {
		if(this.data.todo.indexOf(task) > -1){
		  this.data.todo.splice(this.data.todo.indexOf(task), 1);
		}
    this.updateDataStorage();
    this.noticeService.add({
      content: `${task.title} has been deleted`,
      icon: 'delete',
      autoClose:true, 
      close:true,
      autoCloseDelay:3000,
      type:'success'
    });
  }
  /**
   * deleteAll
   */
  deleteAll(){
    localStorage.removeItem('dailyTask');
    this.data.todo = [];
  }
  /**
   * checkAll
   */
  checkAll(){
    this.data.todo.map(function(x) { 
        x.completed = true; 
        return x;
    });
    this.updateDataStorage();
  }
  /**
   * uncheckAll
   */
  uncheckAll(){
    this.data.todo.map(function(x) { 
        x.completed = false; 
        return x;
    });
    this.updateDataStorage();
  }
  
  /**
   * sortTask()
   */
	sortTask(){
		this.data.todo.sort(function(a,b){
		  return new Date(a.time).getTime() -new Date(b.time).getTime();
		});
	}
  ngOnInit() {
    this.sortTask();
    this.time = new Date(this.datePipe.transform(this.today, 'yyyy-M-d 08:00'));
    this.stepMinute = this.appSettings.settings.stepMinute;
  }
}