package com.legends.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "bin")
@Entity
@Data
public class Bin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "fill_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private STATUS status;

    @Column(name = "registered_location", nullable = false)
    private String registeredLocation;

    @Column(name = "coordinates", nullable = false)
    private String coordinates;

}
