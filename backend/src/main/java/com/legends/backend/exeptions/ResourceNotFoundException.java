package com.legends.backend.exeptions;
//404 not found
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message); // to save massage
    }
}