package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;

import com.examly.springapp.model.Users;
import com.examly.springapp.service.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*" )
public class UsersController {
    @Autowired
    private UsersService usersService;
    //fetchAllUser
    @GetMapping
    public List<Users> getAllUsers() { return usersService.getAllUsers(); }
    
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Long id) { return usersService.getUserById(id); }

//updateUser
    @PutMapping("/update/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users user) {
        user.setUserId(id);
        return usersService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) { usersService.deleteUser(id); }
    //Create a user
    @PostMapping("/register")
    public ResponseEntity<Users> register(@Valid@RequestBody Users user) {
    return ResponseEntity.ok(usersService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestParam String email, @RequestParam String password) {
    return ResponseEntity.ok(usersService.login(email, password));
    }

    @PostMapping("/{id}/logout")
    public ResponseEntity<String> logout(@PathVariable Long id) {
    usersService.logout(id);
    return ResponseEntity.ok("User logged out successfully");
    }

}
