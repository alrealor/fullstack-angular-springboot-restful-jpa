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
    console.log('delete ${userName} - ${todoId}')
    return this.http.delete(`http://localhost:8088/users/${userName}/todos/${todoId}`);
  }
}
