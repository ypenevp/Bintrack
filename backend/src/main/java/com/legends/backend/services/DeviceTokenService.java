package com.legends.backend.services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
public class DeviceTokenService {
    private final SecureRandom secureRandom = new SecureRandom();

    public String generateToken(){
        byte[] token = new byte[32];
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }

}
