package com.legends.backend.dto;

import com.legends.backend.entities.ROLE;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoleRequest {
    private String email;
    private ROLE role;
}
