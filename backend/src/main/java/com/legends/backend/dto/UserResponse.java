package com.legends.backend.dto;

import com.legends.backend.entities.ROLE;

public record UserResponse(String email, String username, ROLE role) {}