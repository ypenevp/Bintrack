package com.legends.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Setter
@Getter
public class SensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "device_id", nullable = false)
    private Long deviceID;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "fill_percentage", nullable = false)
    private Long fillPercentage;

    @Column(name = "address")
    private String address;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private STATUS status;
}
