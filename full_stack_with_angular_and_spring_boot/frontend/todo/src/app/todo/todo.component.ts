import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoId:number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['todoId'] 
  }

}
