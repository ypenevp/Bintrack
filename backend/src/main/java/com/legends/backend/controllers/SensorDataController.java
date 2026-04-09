package com.legends.backend.controllers;

import com.legends.backend.entities.Device;
import com.legends.backend.entities.SensorData;
import com.legends.backend.services.DeviceService;
import com.legends.backend.services.SensorDataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;


@RestController
@RequestMapping("/api/v1/sensorData")
@CrossOrigin(origins = "*")
public class SensorDataController {
    private final SensorDataService sensorDataService;
    private final DeviceService deviceService;

    public SensorDataController(SensorDataService sensorDataService, DeviceService deviceService) {
        this.sensorDataService = sensorDataService;
        this.deviceService = deviceService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SensorData> getSensorDataController(@PathVariable Long id){
        SensorData sensorData = this.sensorDataService.getSensorData(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sensorData);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<SensorData>> getAllSensorDataController(){
        List<SensorData> sensorDataList = this.sensorDataService.getAllSensorData();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sensorDataList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSensorDataController(@RequestBody SensorData sensorData){
        Device device = deviceService.authenticateDevice(sensorData.getDeviceToken());

        if(device == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        sensorData.setDeviceID(device.getId());
        SensorData saved = sensorDataService.addSensorData(sensorData);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateSensorDataController(@PathVariable Long id, @RequestBody SensorData sensorData){
        Device device = deviceService.authenticateDevice(sensorData.getDeviceToken());

        if(device == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        sensorData.setId(id);
        SensorData saved = this.sensorDataService.updateSensorData(sensorData);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(saved);
    }
}
