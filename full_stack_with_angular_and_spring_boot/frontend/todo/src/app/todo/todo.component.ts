import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoId:number;
  todo:Todo;

  constructor(
    private route: ActivatedRoute,
    private todoDataService: TodoDataService
    ) {}

  ngOnInit() {
    this.todo = new Todo(1,'','',null,false);
    this.todoId = this.route.snapshot.params['todoId'] 
    this.todoDataService.retrieveTodo('Ryu', this.todoId).subscribe(
      response => this.todo = response
    );
  }

}
