package com.examly.springapp.controller;

import com.examly.springapp.model.Task;
import com.examly.springapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*" )
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create Task
    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task createdTask = taskService.addTask(task);
        return ResponseEntity.ok(createdTask);
    }

    // Get All Tasks
    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get Task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    // Delete Task
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully with id: " + id);
    }
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> markCompleted(@PathVariable Long id) {
    return ResponseEntity.ok(taskService.markCompleted(id));
    }

    @PutMapping("/{id}/priority")
    public ResponseEntity<Task> setPriority(@PathVariable Long id, @RequestParam String priority) {
    return ResponseEntity.ok(taskService.setPriority(id, priority));
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUserId(@PathVariable Long userId) 
    {
    return taskService.getTasksByUserId(userId);
    }


}
