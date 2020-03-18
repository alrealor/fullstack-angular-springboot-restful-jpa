package com.example.rest.webservices.restfulwebservice.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoWebService {
	
	@Autowired
	TodoHarcodedService todoHardcodedService;
	
	// Get all user todos
	@GetMapping(path = "/users/{userName}/todos")
	public List<Todo> getAllTodos(@PathVariable String userName) {
		return todoHardcodedService.findAll();	
	}
	
	// Delete user todo by Id
	@DeleteMapping("users/{userName}/todos/{todoId}")
	public ResponseEntity<Void> deleteById(@PathVariable String userName, @PathVariable long todoId ) {
		if (todoHardcodedService.deleteById(todoId) == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.noContent().build();		
	}


}
