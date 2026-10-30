package com.examly.springapp.model;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Name cannot be blank")
    @Pattern(
    regexp = "^[A-Za-z ]+$",
    message = "Name should contain only letters and spaces"
)
    private String name;

    @NotBlank(message = "Password cannot be blank")
    private String password;

  
    private boolean active;   
    private String role;      

    // Relationship with Task
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks = new ArrayList<>();

   

   

}
