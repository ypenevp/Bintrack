package com.legends.backend.controllers;

import com.legends.backend.dto.UpdateRoleRequest;
import com.legends.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepo;

    public AdminController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PatchMapping("/users/role")
    public void updateUserRole(
            @RequestBody UpdateRoleRequest request,
            @RequestAttribute("email") String adminEmail
    ) {
        System.out.println("Admin " + adminEmail + " is updating role for user: " + request.getEmail());

        var user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(request.getRole());
        userRepo.save(user);

        System.out.println("User " + request.getEmail() + " role updated to: " + request.getRole());
    }
}
