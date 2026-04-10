package com.legends.backend.repositories;

import com.legends.backend.entities.Bin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BinRepository extends JpaRepository<Bin, Long> {
    Optional<Bin> findTopByOrderByIdAsc();
}
