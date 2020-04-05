package com.example.rest.webservices.restfulwebservice.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoWebServiceController {
	
	@Autowired
	TodoHarcodedService todoHardcodedService;
	
	// Get all user Todo's
	@GetMapping(path = "/users/{userName}/todos")
	public List<Todo> getAllTodos(@PathVariable String userName) {
		return todoHardcodedService.findAllTodos();	
	}
		
	// Get Todo by Id
	@GetMapping(path = "/users/{userName}/todos/{todoId}")
	public Todo getTodo(@PathVariable String userName, @PathVariable long todoId) {
		return todoHardcodedService.findTodoById(todoId);	
	}	
		
	// Delete user Todo by Id
	@DeleteMapping("users/{userName}/todos/{todoId}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String userName, @PathVariable long todoId ) {
		if (todoHardcodedService.deleteTodoById(todoId) == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.noContent().build();		
	}
		
	// Update user Todo
	@PutMapping("users/{userName}/todos/{todoId}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String userName
			                             , @PathVariable long todoId
			                             , @RequestBody Todo todo) {
		// Update Todo
		todoHardcodedService.saveTodo(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);				
	}
	
	
	// Add user Todo
	@PostMapping("users/{userName}/todos")
	public ResponseEntity<Void> updateTodo(@PathVariable String userName
			                             , @RequestBody Todo todo) {
		// Add a new Todo
		Todo createdTodo = todoHardcodedService.saveTodo(todo);
		createdTodo.setUserName(userName);
		
		// Build URI with Id of Todo created
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(createdTodo.getId()).toUri();
		
		return  ResponseEntity.created(uri).build();
	}	
	
	


}
