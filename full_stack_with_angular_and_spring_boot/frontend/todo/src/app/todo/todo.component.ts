import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  todoId:number;
  userName:string;
  todo:Todo;
  todoAction:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoDataService: TodoDataService,
    private router: Router
    ) {}

  ngOnInit() {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.userName = this.activatedRoute.snapshot.params['userName']
    this.todo = new Todo(this.todoId, this.userName, '', null, false); // Initialize dummy Todo
    if (this.todoId != -1) {
      this.todoAction = 'Update'
      this.todoDataService.retrieveTodo(this.userName, this.todoId)
        .subscribe(
          response => this.todo = response
        );
    } else {
      this.todoAction = 'Add'
    }     
  }

  // Call add or update action from backend webservice
  saveTodo() {
    if (this.todoId != -1) {
      // Update
      this.todoDataService.updateTodo(this.userName, this.todoId, this.todo)
        .subscribe(
          successResponse => this.router.navigate(['todos', this.userName])
        ); 
    } else {
      // Add
      this.todoDataService.addTodo(this.userName, this.todo)
          .subscribe(
            response => this.router.navigate(['todos', this.userName])
          );
    }    
  }

}
