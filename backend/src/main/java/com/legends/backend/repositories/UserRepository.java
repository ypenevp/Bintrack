package com.legends.backend.repositories;

import com.legends.backend.entities.User;
import com.legends.backend.entities.ROLE;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(ROLE role);
}
