package com.legends.backend.config;

import com.legends.backend.entities.STATUS;
import com.legends.backend.services.BinService;
import lombok.RequiredArgsConstructor;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MqttMessageHandler {

    private final BinService binService;

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(Message<?> message) {

        String payload = message.getPayload().toString().trim();
        String topic = message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC, String.class);

        System.out.println("RAW PAYLOAD: [" + payload + "] FROM TOPIC: [" + topic + "]");

        try {
            String[] topicParts = topic.split("/");
            Long binId = Long.parseLong(topicParts[topicParts.length - 1]);

            String[] parts = payload.split(",");

            if (parts.length >= 4) {
                STATUS status = STATUS.valueOf(parts[0].trim().toUpperCase());
                String registeredLocation = parts[1].trim();
                String coordinates = parts[2].trim();

                binService.saveOrUpdateSensorData(binId, status, registeredLocation, coordinates);
            } else if (parts.length == 3) {
                STATUS status = STATUS.valueOf(parts[0].trim().toUpperCase());
                String registeredLocation = parts[1].trim();
                String coordinates = parts[2].trim();
                String[] coords = coordinates.split(" ");
                if (coords.length >= 2) {
                    Double lat = Double.parseDouble(coords[0].trim());
                    Double lon = Double.parseDouble(coords[1].trim());
                    binService.saveOrUpdateSensorData(binId, status, registeredLocation, coordinates);
                } else {
                    System.out.println("Not enough data coordinates: " + coordinates);
                }
            } else {
                System.out.println("Not enough data: " + payload);
            }

        } catch (IllegalArgumentException e) {
            System.out.println("Invalid payload or topic: " + payload);
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("Error with parsing: " + payload);
            e.printStackTrace();
        }
    }
}
