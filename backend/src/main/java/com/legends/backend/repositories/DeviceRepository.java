package com.legends.backend.repositories;

import com.legends.backend.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository <Device, Long>{
    Optional<Device> findByDeviceToken(String deviceToken);
}
