package com.example.rest.webservices.restfulwebservice.todo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHarcodedService {
	
	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "user_name", "Learn Angular and Typescript", LocalDate.now(), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn Git, GitFlow, Bitbucket and SourceTree", LocalDate.now(), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn Docker and Kubernetes", LocalDate.now(), false));
		todos.add(new Todo(++idCounter, "user_name", "Learn about IntelliJ IDE", LocalDate.now(), false));
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo findById(long todoId) {
		return todos.stream().filter(t -> t.getId() == todoId).findAny().orElse(null);
	}
	
	public Todo deleteById(long todoId) {
		Todo todo = this.findById(todoId);		
		if (todo == null) {
			return null;
		}		
		todos.remove(todo);
		return todo;		
	}	

}
