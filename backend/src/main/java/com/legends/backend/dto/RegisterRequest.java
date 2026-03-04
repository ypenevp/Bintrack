package com.legends.backend.dto;

import com.legends.backend.entities.ROLE;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String username;
    private String password;
    private ROLE role;
}