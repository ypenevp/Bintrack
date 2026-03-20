package com.legends.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<com.legends.backend.entities.UserProfile, Long> {

}