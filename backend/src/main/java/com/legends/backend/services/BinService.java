package com.legends.backend.services;

import com.legends.backend.config.MqttGateway;
import com.legends.backend.entities.Bin;
import com.legends.backend.entities.STATUS;
import com.legends.backend.repositories.BinRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BinService {

    private final BinRepository binRepository;
    private final MqttGateway mqttGateway;

    @Transactional
    public synchronized void saveOrUpdateSensorData(Long id, STATUS status, String registeredLocation, Double longitude, Double latitude) {
        Bin bin = binRepository.findById(id)
                .orElseGet(() -> {
                    Bin newBin = new Bin();
                    return newBin;
                });

        bin.setStatus(status);
        bin.setRegisteredLocation(registeredLocation);
        bin.setLongitude(longitude);
        bin.setLatitude(latitude);

        binRepository.save(bin);
    }
}
