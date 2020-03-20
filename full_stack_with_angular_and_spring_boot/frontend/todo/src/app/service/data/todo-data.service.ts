import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveTodos(userName: string){
    return this.http.get<Todo[]>(`http://localhost:8088/users/${userName}/todos`);
  }

  deleteTodo(userName: string, todoId: number) {
    return this.http.delete(`http://localhost:8088/users/${userName}/todos/${todoId}`);
  }

  retrieveTodo(userName:string, todoId:number){
    return this.http.get<Todo>(`http://localhost:8088/users/${userName}/todos/${todoId}`);
  }

  updateTodo(userName:string, todoId:number, todo:Todo){
    return this.http.put(`http://localhost:8088/users/${userName}/todos/${todoId}`, todo);
  }

  addTodo(userName:string, todo:Todo) {
    return this.http.post(`http://localhost:8088/users/${userName}/todos`, todo);
  }  
}
