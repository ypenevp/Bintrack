package com.legends.backend.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "device_token", nullable = false)
    private String deviceToken;

    @Column(name = "active", nullable = false)
    private Boolean active;
}

