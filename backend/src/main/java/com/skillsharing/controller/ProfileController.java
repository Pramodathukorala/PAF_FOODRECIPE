package com.skillsharing.controller;

import com.skillsharing.dto.ProfileDTO;
import com.skillsharing.dto.ProfileUpdateDTO;
import com.skillsharing.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable String username) {
        return ResponseEntity.ok(profileService.getProfile(username));
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileDTO> getMyProfile(Authentication authentication) {
        return ResponseEntity.ok(profileService.getProfileByEmail(authentication.getName()));
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateDTO updateDTO) {
        return ResponseEntity.ok(profileService.updateProfile(authentication.getName(), updateDTO));
    }

    @PostMapping("/picture")
    public ResponseEntity<ProfileDTO> updateProfilePicture(
            Authentication authentication,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(profileService.updateProfilePicture(authentication.getName(), file));
    }

    @PostMapping("/connect/{username}")
    public ResponseEntity<?> connectWithUser(
            Authentication authentication,
            @PathVariable String username) {
        profileService.connectWith(authentication.getName(), username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/connect/{username}")
    public ResponseEntity<?> disconnectFromUser(
            Authentication authentication,
            @PathVariable String username) {
        profileService.disconnectFrom(authentication.getName(), username);
        return ResponseEntity.ok().build();
    }
}