package com.examly.springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Reminders;
import com.examly.springapp.model.Task;
import com.examly.springapp.repository.RemindersRepository;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.exception.ResourceNotFoundException;

@Service
public class RemindersService {
    @Autowired
    private RemindersRepository remindersRepository;
     @Autowired
    private TaskRepository taskRepository;

    public List<Reminders> getAllReminders() {
        return remindersRepository.findAll();
    }

    public Reminders getReminderById(Long id) {
        return remindersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reminder not found with id: " + id));
    }
    //Schedule Reminder
     public Reminders saveReminder(Long id, Reminders reminder) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        // Link reminder to task
        reminder.setTask(task);

        // Optional: maintain bidirectional consistency
        task.getReminders().add(reminder);

        return remindersRepository.save(reminder);
    }

    //cancel Reminder
    public void deleteReminder(Long id) {
        if (!remindersRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reminder not found with id: " + id);
        }
        remindersRepository.deleteById(id);
    }
    //
    public Reminders completeReminder(Long id) {

    Reminders reminder = remindersRepository.findById(id)
            .orElseThrow(() ->
                new ResourceNotFoundException(
                    "Reminder not found with id: " + id
                )
            );

    reminder.setStatus("Completed");

    return remindersRepository.save(reminder);
}
}
