package com.example.rest.webservices.restfulwebservice.todo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class TodoHarcodedService {
	
	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "user_name", "Learn Angular and Typescript", LocalDate.now().plusMonths(1), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn Git, GitFlow, Bitbucket and SourceTree", LocalDate.now().plusMonths(2), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn Docker and Kubernetes", LocalDate.now().plusMonths(3), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn about IntelliJ IDE", LocalDate.now().plusMonths(4), false));
	}
	
	// Find all Todo's
	public List<Todo> findAllTodos() {
		return todos;
	}
	
	// Find Todo by Id
	public Todo findTodoById(long todoId) {
		return todos.stream().filter(t -> t.getId() == todoId).findAny().orElse(null);
	}
	
	// Delete Todo by Id	
	public Todo deleteTodoById(long todoId) {
		Todo todo = this.findTodoById(todoId);		
		if (todo == null) {
			return null;
		}		
		todos.remove(todo);
		return todo;		
	}

	// Save or Add Todo	from Todo's list
	public Todo saveTodo(Todo todo) {
		//Verify if Todo exists in Todo's list
		if (todos.stream().filter(t -> t.getId() == todo.getId())
				.findFirst().orElse(null) == null) {
			// The Todo does not exists then add it
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			// Update the Todo from the existing Todo's list
			todos.stream().map(t -> {
				if (t.getId() == todo.getId()) {
					t.setDescription(todo.getDescription());
					t.setTargetDate(todo.getTargetDate());
				}
				return t;
			}).collect(Collectors.toList());
		}
		return todo;
	}


}
