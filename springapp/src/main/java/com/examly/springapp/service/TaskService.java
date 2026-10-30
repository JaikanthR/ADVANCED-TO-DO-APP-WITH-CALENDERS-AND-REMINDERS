package com.examly.springapp.service;

import com.examly.springapp.model.Task;
import com.examly.springapp.model.Users;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.repository.UsersRepository;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.exception.InvalidDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UsersRepository usersRepository;

    public Task addTask(Task task) {
        if (task.getUser() != null && task.getUser().getUserId() != null) {
            Users user = usersRepository.findById(task.getUser().getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            task.setUser(user);
              return taskRepository.save(task);
        } else {
          
           throw new InvalidDataException("User information is required to create a task.");
        }
      
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
      }

    public Task markCompleted(Long id) 
    {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    task.setCompleted(true);
    return taskRepository.save(task);
    }

    public Task setPriority(Long id, String priority)   
  {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    task.setPriority(priority);
    return taskRepository.save(task);
    }

    public List<Task> getTasksByUserId(Long userId) 
    {
    return taskRepository.findByUserUserId(userId);
    }
}
