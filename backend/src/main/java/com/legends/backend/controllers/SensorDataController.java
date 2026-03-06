package com.legends.backend.controllers;

import com.legends.backend.entities.SensorData;
import com.legends.backend.services.SensorDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/sensorData")
public class SensorDataController {
    private final SensorDataService sensorDataService;

    public SensorDataController(SensorDataService sensorDataService) {
        this.sensorDataService = sensorDataService;
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
    public SensorData addSensorDataController(@RequestBody SensorData sensorData){
        return this.sensorDataService.addSensorData(sensorData);
    }

    @PatchMapping("/update/{id}")
    public SensorData updateSensorDataController(@PathVariable Long id, @RequestBody SensorData sensorData){
        sensorData.setId(id);
        return this.sensorDataService.updateSensorData(sensorData);
    }
}
