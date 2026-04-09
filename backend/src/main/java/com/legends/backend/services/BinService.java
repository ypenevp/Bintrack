package com.legends.backend.services;

import com.legends.backend.config.MqttGateway;
import com.legends.backend.entities.Bin;
import com.legends.backend.entities.STATUS;
import com.legends.backend.repositories.BinRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BinService {

    private final BinRepository binRepository;
    private final MqttGateway mqttGateway;

    @Transactional
    public synchronized void saveOrUpdateSensorData(Long id, STATUS status, String registeredLocation, String coordinates) {
        Bin bin = binRepository.findById(id)
                .orElseGet(() -> {
                    Bin newBin = new Bin();
                    return newBin;
                });

        bin.setStatus(status);
        bin.setRegisteredLocation(registeredLocation);
        bin.setCoordinates(coordinates);
        binRepository.save(bin);
    }

    public Bin getBin(Long id) {
        return this.binRepository.findById(id).orElse(null);
    }

    public List<Bin> getAllBins() {
        return this.binRepository.findAll();
    }
}
