package com.fullstack.restfulwebservice.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "user",
            "$2a$10$jYvyNSKquhdMGL0HJSrZ6e6P/a4G22ao8R1XB.ei27J6gsqCoaNlS", "ROLE_USER_1"));
    
    inMemoryUserList.add(new JwtUserDetails(2L, "Marty McFly",
            "$2a$10$jYvyNSKquhdMGL0HJSrZ6e6P/a4G22ao8R1XB.ei27J6gsqCoaNlS", "ROLE_USER_2"));     
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}


