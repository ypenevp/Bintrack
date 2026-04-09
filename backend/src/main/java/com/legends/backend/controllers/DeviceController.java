package com.legends.backend.controllers;


import com.legends.backend.entities.Device;
import com.legends.backend.services.DeviceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devices")
public class DeviceController {
    public final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Device> getDeviceController(@PathVariable Long id) {
        Device device = this.deviceService.getDevice(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(device);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Device>> getAllDevicesController() {
        List<Device> devices = this.deviceService.getAllDevices();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(devices);
    }

    @PostMapping("/add")
    public ResponseEntity<Device> addDeviceController(@RequestBody Device device) {
        Device newDevice = this.deviceService.addDevice(device);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newDevice);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Device> updateDeviceController(@PathVariable Long id, @RequestBody Device device) {
        device.setId(id);
        Device updatedDevice = this.deviceService.updateDevice(device);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedDevice);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDeviceController(@PathVariable Long id) {
        this.deviceService.deleteDevice(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

}
