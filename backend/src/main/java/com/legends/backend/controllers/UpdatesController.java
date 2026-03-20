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
    public Updates createUpdates(
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

        return updatesService.addUpdates(updates);
    }


    @GetMapping("/getall")
    public List<Updates> getAllUpdates() {
        return this.updatesService.getAllUpdates();
    }

    @GetMapping("/getupdate/{id}")
    public Updates getNews(@PathVariable Long id) {
        return this.updatesService.getUpdates(id);
    }

    @PatchMapping("/updateupdate/{id}")
    public Updates updateUpdates(@PathVariable Long id, @RequestBody Updates updates) {
        updates.setId(id);
        return this.updatesService.updateUpdates(updates);
    }

    @DeleteMapping("/deleteupdate/{id}")
    public void deleteUpdates(@PathVariable Long id) {
        this.updatesService.deleteUpdates(id);
    }
}
