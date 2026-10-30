package com.examly.springapp.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reminders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;
    private String remindTime;
    private String status;

    @ManyToOne
    @JoinColumn(name = "task_id")
     @JsonBackReference
    private Task task;
    
}
