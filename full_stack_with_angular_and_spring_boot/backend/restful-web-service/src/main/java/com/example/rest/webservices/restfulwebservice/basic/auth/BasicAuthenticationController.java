package com.example.rest.webservices.restfulwebservice.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BasicAuthenticationController {
	
	@GetMapping(path="/basicauth")
	public BasicAuthenticationBean basicAuthentication() {
		// throw new RuntimeException("Something wrong occurred! \n ERROR_CODE:A25");
		return new BasicAuthenticationBean("You are authenticated!");
	}
	
	

}
