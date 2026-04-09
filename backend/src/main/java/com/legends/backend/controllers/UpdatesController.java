package com.legends.backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.cloudinary.utils.ObjectUtils;
import com.legends.backend.dto.UpdatesCreateRequest;
import com.legends.backend.entities.Updates;
import com.legends.backend.entities.User;
import com.legends.backend.repositories.UserRepository;
import com.legends.backend.security.JwtService;
import com.legends.backend.services.AuthService;
import com.legends.backend.services.CloudinaryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.legends.backend.services.UpdatesService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/updates")
public class UpdatesController {
    private final UpdatesService updatesService;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final JwtService jwtService;


    public UpdatesController(UpdatesService updatesService, CloudinaryService cloudinaryService, UserRepository userRepository, AuthService authService, JwtService jwtService) {
        this.updatesService = updatesService;
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/createupdate")
    public ResponseEntity<Updates> createUpdates(
            @ModelAttribute UpdatesCreateRequest data,
            HttpServletRequest request
    ) throws IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Updates updates = new Updates();
        updates.setTitle(data.getTitle());
        updates.setArticle(data.getArticle());
        updates.setUser(user);

        Map uploadImage = cloudinaryService.getCloudinary()
                .uploader()
                .upload(data.getImage().getBytes(), ObjectUtils.emptyMap());

        String pictureUrl = (String) uploadImage.get("secure_url");
        updates.setPicture(pictureUrl);

        Updates created = updatesService.addUpdates(updates);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Updates>> getAllUpdates() {
        List<Updates> updates = this.updatesService.getAllUpdates();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updates);
    }

    @GetMapping("/getupdate/{id}")
    public ResponseEntity<Updates> getNews(@PathVariable Long id) {
        Updates updates = this.updatesService.getUpdates(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updates);
    }

    @PatchMapping("/updateupdate/{id}")
    public ResponseEntity<Updates> updateUpdates(@PathVariable Long id, @RequestBody Updates updates) {
        updates.setId(id);
        Updates updated = this.updatesService.updateUpdates(updates);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updated);
    }

    @DeleteMapping("/deleteupdate/{id}")
    public ResponseEntity<Void> deleteUpdates(@PathVariable Long id) {
        this.updatesService.deleteUpdates(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
