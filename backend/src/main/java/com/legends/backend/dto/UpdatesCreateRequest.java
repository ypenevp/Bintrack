package com.legends.backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UpdatesCreateRequest {
    private String title;
    private String article;
    private Boolean status;
    private Long id;
    private MultipartFile image;
}
