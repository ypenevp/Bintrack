package com.legends.backend.services;

import com.legends.backend.entities.Device;
import com.legends.backend.repositories.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final DeviceTokenService tokenService;

    public DeviceService(DeviceRepository deviceRepository, DeviceTokenService tokenService) {
        this.deviceRepository = deviceRepository;
        this.tokenService = tokenService;
    }

    public Device getDevice(Long id){
        Optional<Device> deviceToGet = deviceRepository.findById(id);

        if(deviceToGet.isEmpty()){
            return null;
        }

        return deviceToGet.get();
    }

    public List<Device> getAllDevices(){
        return this.deviceRepository.findAll();
    }

    public Device addDevice(Device device){
        device.setDeviceToken(tokenService.generateToken());
        device.setActive(true);
        return this.deviceRepository.save(device);
    }

    public Device updateDevice(Device device){
        Device deviceToUpdate = this.getDevice(device.getId());

        if(deviceToUpdate == null){
            return null;
        }

        if(device.getActive() != null){
            deviceToUpdate.setActive(device.getActive());
        }

        return this.deviceRepository.save(deviceToUpdate);
    }

    public void deleteDevice(Long id){
        Optional<Device> deviceToDelete = this.deviceRepository.findById(id);

        if(deviceToDelete.isPresent()){
            this.deviceRepository.deleteById(id);
        }

    }

    public Device authenticateDevice(String token){
        Optional<Device> device = deviceRepository.findByDeviceToken(token);

        if(device.isEmpty()){
            return null;
        }

        if(!device.get().getActive()){
            return null;
        }

        return device.get();
    }

}
