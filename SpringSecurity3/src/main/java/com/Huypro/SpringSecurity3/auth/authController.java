package com.Huypro.SpringSecurity3.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class authController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register/user")
    public ResponseEntity registerUser(
            @RequestBody RegisterRequest registerRequest
    ) {
    AuthResponse authResponse = authService.registerUser(registerRequest);
    return ResponseEntity.ok(authResponse);
    }
    @PostMapping("/register/admin")
    public ResponseEntity registerAdmin(
            @RequestBody RegisterRequest registerRequest
    ) {
        AuthResponse authResponse = authService.registerAdmin(registerRequest);
       return ResponseEntity.ok(authResponse);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request
    ) {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(authResponse);
    }

}
