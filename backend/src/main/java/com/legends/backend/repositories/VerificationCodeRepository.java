package com.legends.backend.repositories;


import com.legends.backend.entities.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<com.legends.backend.entities.VerificationCode, Long> {
    Optional<VerificationCode> findByCode(String code);
}