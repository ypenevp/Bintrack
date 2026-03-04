package com.legends.backend.controllers;

import com.legends.backend.dto.*;
import com.legends.backend.services.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/verify")
    public void verify(@RequestBody VerificationRequest request) {
        authService.verifyEmail(request.getCode());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse getUserData(@RequestAttribute("email") String email) {
        return authService.getUserData(email);
    }
}