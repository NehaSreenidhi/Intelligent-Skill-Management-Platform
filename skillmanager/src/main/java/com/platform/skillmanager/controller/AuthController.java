package com.platform.skillmanager.controller;

import com.platform.skillmanager.dto.LoginRequest;
import com.platform.skillmanager.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth APIs")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request){
        System.out.println("==========LOGIN API HIT==========");
        return authService.login(request);
    }
}
