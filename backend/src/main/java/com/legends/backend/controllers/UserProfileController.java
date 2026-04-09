package com.legends.backend.controllers;

import java.io.IOException;
import java.util.Map;

import com.cloudinary.utils.ObjectUtils;
import com.legends.backend.dto.UserProfileCreateRequest;
import com.legends.backend.entities.ROLE;
import com.legends.backend.entities.THEME;
import com.legends.backend.entities.UserProfile;
import com.legends.backend.entities.User;
import com.legends.backend.repositories.UserRepository;
import com.legends.backend.security.JwtService;
import com.legends.backend.services.AuthService;
import com.legends.backend.services.CloudinaryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.legends.backend.services.UserProfileService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/userprofile")
public class UserProfileController {
    private final UserProfileService userProfileService;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final JwtService jwtService;


    public UserProfileController(UserProfileService userProfileService, CloudinaryService cloudinaryService, UserRepository userRepository, AuthService authService, JwtService jwtService) {
        this.userProfileService = userProfileService;
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/createuserprofile")
    public ResponseEntity<UserProfile> createUserProfile(
            @ModelAttribute UserProfileCreateRequest data,
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

        UserProfile userProfile = new UserProfile();
        userProfile.setAddress(data.getAddress());

        if (user.getRole() == ROLE.USER && data.getTelephone() != null) {
            throw new RuntimeException("Users cannot set telephone number");
        }

        if (user.getRole() == ROLE.ADMIN || user.getRole() == ROLE.WORKER) {
            userProfile.setTelephone(data.getTelephone());
        }

        userProfile.setTheme(THEME.LIGHT);
        userProfile.setUser(user);

        Map uploadImage = cloudinaryService.getCloudinary()
                .uploader()
                .upload(data.getPhoto().getBytes(), ObjectUtils.emptyMap());

        String pictureUrl = (String) uploadImage.get("secure_url");
        userProfile.setPhoto(pictureUrl);

        UserProfile created = userProfileService.addUserProfile(userProfile);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @GetMapping("/getuserprofile/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long id) {
        UserProfile profile = this.userProfileService.getUserProfile(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(profile);
    }

    @PatchMapping("/updateuserprofile/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(
            @PathVariable Long id,
            @RequestBody UserProfile userProfile
    ) {
        userProfile.setId(id);
        UserProfile updated = this.userProfileService.updateUserProfile(userProfile);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updated);
    }

    @DeleteMapping("/deleteuserprofile/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        this.userProfileService.deleteUserProfile(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}