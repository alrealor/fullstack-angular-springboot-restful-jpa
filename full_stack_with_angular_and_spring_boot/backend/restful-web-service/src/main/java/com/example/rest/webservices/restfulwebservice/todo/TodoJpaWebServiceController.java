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
public class TodoJpaWebServiceController {
	
	@Autowired
	TodoJpaRepository todoJpaRepository;
	
	// Get all user Todo's
	@GetMapping(path = "/jpa/users/{userName}/todos")
	public List<Todo> getAllTodos(@PathVariable String userName) {
		return todoJpaRepository.findByUserName(userName);
	}
		
	// Get Todo by Id
	@GetMapping(path = "/jpa/users/{userName}/todos/{todoId}")
	public Todo getTodo(@PathVariable String userName, @PathVariable long todoId) {
		return todoJpaRepository.findById(todoId).get();
	}	
	
	
	// Delete user Todo by Id
	@DeleteMapping("/jpa/users/{userName}/todos/{todoId}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String userName, @PathVariable long todoId ) {	
		todoJpaRepository.deleteById(todoId);		
		return ResponseEntity.noContent().build();		
	}
		
	// Update user Todo
	@PutMapping("/jpa/users/{userName}/todos/{todoId}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String userName
			                             , @PathVariable long todoId
			                             , @RequestBody Todo todo) {
		// Update Todo
		todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);				
	}
	
	
	// Add user Todo
	@PostMapping("/jpa/users/{userName}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String userName
			                             , @RequestBody Todo todo) {
		// Add a new Todo
		Todo createdTodo = todoJpaRepository.save(todo);
		createdTodo.setUserName(userName);
		
		// Build URI with Id of Todo created
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(createdTodo.getId()).toUri();
		
		return  ResponseEntity.created(uri).build();
	}	
}
