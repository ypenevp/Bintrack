package com.legends.backend.controllers;

import com.legends.backend.entities.Bin;
import com.legends.backend.services.BinService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bins")
public class BinController {
    private final BinService binService;

    public BinController(BinService binService) {
        this.binService = binService;
    }

    @GetMapping("/get/{id}")
    public Bin getBinController(@PathVariable Long id) {
        return this.binService.getBin(id);
    }

    @GetMapping("/get/all")
    public List<Bin> getAllBinsController() {
        return this.binService.getAllBins();
    }
}
