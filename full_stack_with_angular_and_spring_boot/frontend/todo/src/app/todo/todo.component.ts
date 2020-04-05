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
  todo:Todo;

  constructor(
    private route: ActivatedRoute,
    private todoDataService: TodoDataService,
    private router: Router
    ) {}

  ngOnInit() {
    this.todoId = this.route.snapshot.params['todoId']
    this.todo = new Todo(this.todoId,'Marty McFly','',null,false); // Initialize dummy Todo
    if (this.todoId != -1) {
      this.todoDataService.retrieveTodo('Marty McFly', this.todoId).subscribe(
        response => this.todo = response
      );
    }     
  }

  // Call add or update action from backend webservice
  saveTodo() {
    if(this.todoId != -1) {
      // Update
      this.todoDataService.updateTodo('Marty McFly', this.todoId, this.todo)
      .subscribe(
        response => this.router.navigate(['todos'])
      ); 
    } else {
      // Add
      this.todoDataService.addTodo('Marty McFly', this.todo)
          .subscribe(
            response => this.router.navigate(['todos'])
          );
    }    
  }

}
