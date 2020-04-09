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
  
  userName: string
  todos: Todo[]
  deleteMessage: string

  constructor(private todoDataService: TodoDataService
            , private router: Router
            , private activatedRoute: ActivatedRoute) {
    this.userName = this.activatedRoute.snapshot.params['userName']
  }


  ngOnInit() { 
    this.refreshTodos();
  }

  // Call GET WS operation to retrieve all todos
  refreshTodos() {
    this.todoDataService.retrieveTodos(this.userName)
      .subscribe(
        response => this.handleSuccessResponse(response)
      )
  }

  handleSuccessResponse(response: Todo[]) {
    this.todos = response
  }  

  // Call DELETE WS operation to delete by todo id
  deleteTodo(todoId: number){
    this.todoDataService.deleteTodo(this.userName, todoId)
      .subscribe(
        response => {
          this.deleteMessage = `Todo ${todoId} was deleted successfully!`;
          this.refreshTodos();       
        }
      )
  }  

  // Router to Update screen to update todo
  updateTodo(userName:string, todoId: number){
    this.router.navigate (['todo', userName, todoId]);
  }
  
  // Router to Update screen to update todo
  addTodo() {
    this.router.navigate(['todo', this.userName, -1])
  }  

}
