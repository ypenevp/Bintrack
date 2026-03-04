package com.legends.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.legends.backend.entities.Updates;

@Repository
public interface UpdatesRepository extends JpaRepository<Updates, Long> {

}
