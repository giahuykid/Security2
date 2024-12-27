package com.Huypro.SpringSecurity3.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class authController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register/user")
    public void registerUser(
            @RequestBody RegisterRequest registerRequest
    ) {

        authService.registerUser(registerRequest);
    }
    @PostMapping("/register/admin")
    public void registerAdmin(
            @RequestBody RegisterRequest registerRequest
    ) {
       authService.registerAdmin(registerRequest);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

}
