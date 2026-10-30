package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.examly.springapp.model.Reminders;
import com.examly.springapp.service.RemindersService;

@RestController
@RequestMapping("/reminders")
@CrossOrigin(origins = "*" )
public class RemindersController {
    @Autowired
    private RemindersService remindersService;
    

    @GetMapping("/all")
    public List<Reminders> getAllReminders() { return remindersService.getAllReminders(); }

    @GetMapping("/{id}")
    public Reminders getReminderById(@PathVariable Long id) { return remindersService.getReminderById(id); }

    @PostMapping("/scheduleReminder/taskId/{id}")
    public ResponseEntity<Reminders> addReminder(@PathVariable Long id,@RequestBody Reminders reminder)
    {
    Reminders savedReminder = remindersService.saveReminder(id, reminder);
    return ResponseEntity.ok(savedReminder);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> deleteReminder(@PathVariable Long id)
     { remindersService.deleteReminder(id);
        return ResponseEntity.ok("Reminder cancelled successfully");
     }
     @PutMapping("/complete/{id}")
      public ResponseEntity<Reminders> completeReminder(@PathVariable Long id) {
       Reminders reminder = remindersService.completeReminder(id);
       return ResponseEntity.ok(reminder);
}
}
