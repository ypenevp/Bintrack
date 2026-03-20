package com.legends.backend.controllers;

import com.legends.backend.entities.Device;
import com.legends.backend.entities.SensorData;
import com.legends.backend.services.DeviceService;
import com.legends.backend.services.SensorDataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public SensorData getSensorDataController(@PathVariable Long id){
        return this.sensorDataService.getSensorData(id);
    }

    @GetMapping("/getAll")
    public List<SensorData> getAllSensorDataController(){
        return this.sensorDataService.getAllSensorData();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSensorDataController(@RequestBody SensorData sensorData){
        Device device = deviceService.authenticateDevice(sensorData.getDeviceToken());

        if(device == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        sensorData.setDeviceID(device.getId());
        SensorData saved = sensorDataService.addSensorData(sensorData);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/update/{id}")
    public SensorData updateSensorDataController(@PathVariable Long id, @RequestBody SensorData sensorData){
        sensorData.setId(id);
        return this.sensorDataService.updateSensorData(sensorData);
    }
}
