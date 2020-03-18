import { Component, OnInit } from '@angular/core';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public userName: string,
    public description: string,
    public targetDate: Date,
    public done: boolean
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})

// Class incharged of call backend web service TodoDataService
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1, 'Learn Angular and Typescript', new Date(), false),
  //   new Todo(2, 'Learn Git, GitFlow, Bitbucket and SourceTree', new Date(), false),
  //   new Todo(3, 'Learn Docker and Kubernetes', new Date(), false),
  //   new Todo(4, 'Learn about IntelliJ IDE', new Date(), false)
  // ] 

  todos: Todo[]
  deleteMessage: string

  constructor(
    private todoDataService: TodoDataService,
    private router: Router
    ) { }

  ngOnInit() { 
    this.refreshTodos();
  }

  // Call GET WS operation to retrieve all todos
  refreshTodos() {
    this.todoDataService.retrieveTodos('Ryu').subscribe(
      response => this.handleSuccessResponse(response)
    )
  }

  // Call DELETE WS operation to delete by todo id
  deleteTodo(todoId: number){
    this.todoDataService.deleteTodo('X-Man', todoId).subscribe(
      response => {
        this.deleteMessage = `Todo ${todoId} was deleted successfully!`;
        this.refreshTodos();       
      }
    )
  }

  // Router to Update screen to update todo
  updateTodo(todoId: number){
    this.router.navigate (['todos', todoId]);
  }  

  handleSuccessResponse(response: Todo[]) {
    this.todos = response
  }

}
