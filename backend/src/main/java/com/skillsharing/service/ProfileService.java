package com.skillsharing.service;

import com.skillsharing.dto.ProfileDTO;
import com.skillsharing.dto.ProfileUpdateDTO;
import com.skillsharing.model.User;
import com.skillsharing.repository.PostRepository;
import com.skillsharing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private static final String UPLOAD_DIR = "uploads/profile-pictures/";

    public ProfileDTO getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfileDTO(user);
    }

    public ProfileDTO getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfileDTO(user);
    }

    public ProfileDTO updateProfile(String email, ProfileUpdateDTO updateDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateDTO.getFirstName() != null) user.setFirstName(updateDTO.getFirstName());
        if (updateDTO.getLastName() != null) user.setLastName(updateDTO.getLastName());
        if (updateDTO.getHeadline() != null) user.setHeadline(updateDTO.getHeadline());
        if (updateDTO.getBio() != null) user.setBio(updateDTO.getBio());
        if (updateDTO.getLocation() != null) user.setLocation(updateDTO.getLocation());
        if (updateDTO.getWebsite() != null) user.setWebsite(updateDTO.getWebsite());
        if (updateDTO.getWorkExperience() != null) user.setWorkExperience(updateDTO.getWorkExperience());
        if (updateDTO.getEducation() != null) user.setEducation(updateDTO.getEducation());
        if (updateDTO.getSkills() != null) user.setSkills(updateDTO.getSkills());
        if (updateDTO.getCertifications() != null) user.setCertifications(updateDTO.getCertifications());
        if (updateDTO.getLanguages() != null) user.setLanguages(updateDTO.getLanguages());

        User savedUser = userRepository.save(user);
        return mapToProfileDTO(savedUser);
    }

    public ProfileDTO updateProfilePicture(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // Create uploads directory if it doesn't exist
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            // Generate unique filename
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + filename);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Update user profile picture URL
            user.setProfilePicture("/uploads/profile-pictures/" + filename);
            User savedUser = userRepository.save(user);

            return mapToProfileDTO(savedUser);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture", e);
        }
    }

    public void connectWith(String userEmail, String targetUsername) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findByUsername(targetUsername)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        user.getFollowing().add(targetUser.getId());
        targetUser.getFollowers().add(user.getId());

        userRepository.save(user);
        userRepository.save(targetUser);
    }

    public void disconnectFrom(String userEmail, String targetUsername) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findByUsername(targetUsername)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        user.getFollowing().remove(targetUser.getId());
        targetUser.getFollowers().remove(user.getId());

        userRepository.save(user);
        userRepository.save(targetUser);
    }

    private ProfileDTO mapToProfileDTO(User user) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setHeadline(user.getHeadline());
        dto.setBio(user.getBio());
        dto.setLocation(user.getLocation());
        dto.setWebsite(user.getWebsite());
        dto.setProfilePicture(user.getProfilePicture());
        dto.setWorkExperience(user.getWorkExperience());
        dto.setEducation(user.getEducation());
        dto.setSkills(user.getSkills());
        dto.setCertifications(user.getCertifications());
        dto.setLanguages(user.getLanguages());
        dto.setConnectionCount(user.getFollowers().size());
        dto.setPostCount((int) postRepository.countByAuthorId(user.getId()));
        return dto;
    }
}