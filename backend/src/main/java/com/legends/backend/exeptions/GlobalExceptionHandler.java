/*package com.legends.backend.exeptions;

import com.legends.backend.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthService.VerificationCodeExpiredException.class)
    public ResponseEntity<String> handleVerificationCodeExpired(AuthService.VerificationCodeExpiredException ex) {
        return ResponseEntity
                .status(400)
                .body(ex.getMessage());
    }

    @ExceptionHandler(AuthService.NotFoundException.class)
    public ResponseEntity<String> handleNotFound(AuthService.NotFoundException ex) {
        return ResponseEntity
                .status(404)
                .body(ex.getMessage());
    }

    @ExceptionHandler(AuthService.EmailNotVerifiedException.class)
    public ResponseEntity<String> handleEmailNotVerifiedException(AuthService.VerificationCodeExpiredException ex) {
        return ResponseEntity
                .status(403)
                .body(ex.getMessage());
    }

    @ExceptionHandler(AuthService.BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(AuthService.VerificationCodeExpiredException ex) {
        return ResponseEntity
                .status(401)
                .body(ex.getMessage());
    }
}*/