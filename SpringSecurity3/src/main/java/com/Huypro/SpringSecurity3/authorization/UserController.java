package com.Huypro.SpringSecurity3.authorization;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/management")
@PreAuthorize("hasRole('USER')")
public class UserController {
    @GetMapping("/user")
    public String getUser() {
        return "Hello User";
    }
}
