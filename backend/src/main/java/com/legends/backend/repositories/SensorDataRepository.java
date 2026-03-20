package com.legends.backend.repositories;

import com.legends.backend.entities.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorDataRepository extends JpaRepository <SensorData, Long> {

}
