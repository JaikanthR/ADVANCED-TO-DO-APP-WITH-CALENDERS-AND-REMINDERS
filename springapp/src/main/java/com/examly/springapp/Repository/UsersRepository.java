package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.*;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> 
{
   
   
    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);
}

