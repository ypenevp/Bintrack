package com.legends.backend.controllers;


import com.legends.backend.entities.Device;
import com.legends.backend.services.DeviceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devices")
public class DeviceController {
    public final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/get/{id}")
    public Device getDeviceController(@PathVariable Long id){
        return this.deviceService.getDevice(id);
    }

    @GetMapping("/getAll")
    public List<Device> getAllDevicesController(){
        return this.deviceService.getAllDevices();
    }

    @PostMapping("/add")
    public Device addDeviceController(@RequestBody Device device) {
        return this.deviceService.addDevice(device);
    }

    @PatchMapping("/update/{deviceId}")
    public Device updateDeviceController(@PathVariable Long id, @RequestBody Device device) {
        device.setId(id);
        return this.deviceService.updateDevice(device);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDeviceController(@PathVariable Long id) {
        this.deviceService.deleteDevice(id);
    }

}
