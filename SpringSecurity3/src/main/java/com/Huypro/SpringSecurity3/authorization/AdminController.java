package com.Huypro.SpringSecurity3.authorization;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @GetMapping("/admin")
    public String getAdmin() {
        return "Hello Admin";
    }
}
