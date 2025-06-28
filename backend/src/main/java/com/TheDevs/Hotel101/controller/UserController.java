package com.TheDevs.Hotel101.controller;

import com.TheDevs.Hotel101.config.JwtService;
import com.TheDevs.Hotel101.dto.UserDto;
import com.TheDevs.Hotel101.model.User;
import com.TheDevs.Hotel101.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> signUp(@RequestBody UserDto userDto) {
        userService.createUser(userDto);
        UserDetails userDetails = userService.loadUserByUsername(userDto.getEmail());
        String jwt = jwtService.generateToken(Map.of(), userDetails);
        return ResponseEntity.ok(Map.of("token", jwt));
    }
}