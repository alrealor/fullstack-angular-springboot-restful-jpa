import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL, TODO_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveTodo(userName:string, todoId:number){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${todoId}`);
  }

  retrieveTodos(userName: string){
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${userName}/todos`);
  }

  deleteTodo(userName: string, todoId: number) {
    return this.http.delete(`${API_URL}/users/${userName}/todos/${todoId}`);
  }  

  updateTodo(userName:string, todoId:number, todo:Todo){
    return this.http.put(`${API_URL}/users/${userName}/todos/${todoId}`, todo);
  }

  addTodo(userName:string, todo:Todo) {
    return this.http.post(`${API_URL}/users/${userName}/todos`, todo);
  }  
}
