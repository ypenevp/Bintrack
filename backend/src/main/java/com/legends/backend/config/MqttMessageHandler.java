package com.legends.backend.config;

import com.legends.backend.entities.STATUS;
import com.legends.backend.services.BinService;
import lombok.RequiredArgsConstructor;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MqttMessageHandler {

    private final BinService binService;

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(Message<?> message) {

        String payload = message.getPayload().toString().trim();

        System.out.println("RAW PAYLOAD: [" + payload + "]");

        try {
            String[] parts = payload.split(",");

            if (parts.length >= 3) {
                STATUS status = STATUS.valueOf(parts[0].trim().toUpperCase());
                String registeredLocation = parts[1].trim();
                String coordinates = parts[2].trim();

                binService.saveOrUpdateSensorData(status, registeredLocation, coordinates);
            } else {
                System.out.println("Not enough data: " + payload);
            }

        } catch (IllegalArgumentException e) {
            System.out.println("Invalid STATUS value in payload: " + payload);
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("Error with parsing: " + payload);
            e.printStackTrace();
        }
    }
}
