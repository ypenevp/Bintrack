package com.legends.backend.services;

import com.legends.backend.entities.SensorData;
import com.legends.backend.repositories.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorDataService {
    private final SensorDataRepository sensorDataRepository;

    public SensorDataService(SensorDataRepository sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }

    public SensorData getSensorData(Long id) {
        Optional<SensorData>sensorDataToGet = this.sensorDataRepository.findById(id);
        if(sensorDataToGet.isEmpty()){
            return null;
        }
        return sensorDataToGet.get();
    }

    public List<SensorData> getAllSensorData() {
        return this.sensorDataRepository.findAll();
    }

    public SensorData addSensorData(SensorData sensorData){
        return this.sensorDataRepository.save(sensorData);
    }

    public SensorData updateSensorData(SensorData sensorData){
        SensorData sensorDataToUpdate = this.getSensorData(sensorData.getId());

        if(sensorDataToUpdate == null){
            return null;
        }

        if(sensorData.getLocation() != null){
            sensorDataToUpdate.setLocation(sensorData.getLocation());
        }

        if(sensorData.getFillPercentage() != null){
          sensorDataToUpdate.setFillPercentage(sensorData.getFillPercentage());
        }

        if(sensorData.getAddress() != null){
            sensorDataToUpdate.setAddress(sensorData.getAddress());
        }

        if(sensorData.getStatus() != null){
            sensorDataToUpdate.setStatus(sensorData.getStatus());
        }
        return this.sensorDataRepository.save(sensorDataToUpdate);
    }

}
