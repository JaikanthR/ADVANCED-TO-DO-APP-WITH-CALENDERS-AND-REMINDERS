package com.examly.springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Users;
import com.examly.springapp.repository.UsersRepository;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.exception.DuplicateResourceException;
import com.examly.springapp.exception.InvalidDataException;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Long id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }


    public Users updateUser(Long id, Users user) {
        if (!usersRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        user.setUserId(id);
        return usersRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!usersRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        usersRepository.deleteById(id);
    }
    public Users register(Users user) {
    if (usersRepository.existsByEmail(user.getEmail())) {
        throw new DuplicateResourceException("Email already exists: " + user.getEmail());
    }
    return usersRepository.save(user);
    }

    public Users login(String email, String password) {
    Users user = usersRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    if (!user.getPassword().equals(password)) {
        throw new InvalidDataException("Invalid credentials");
    }
    return user;
    }

    public void logout(Long userId) {
    if (!usersRepository.existsById(userId)) {
        throw new ResourceNotFoundException("User not found with id: " + userId);
    }
   
    }

}
