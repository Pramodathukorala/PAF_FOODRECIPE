package com.skillsharing.service;

import com.skillsharing.dto.ProfileDTO;
import com.skillsharing.dto.ProfileUpdateDTO;
import com.skillsharing.model.User;
import com.skillsharing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    public ProfileDTO getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToProfileDTO(user);
    }

    public ProfileDTO getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToProfileDTO(user);
    }

    public ProfileDTO updateProfile(String email, ProfileUpdateDTO updateDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(updateDTO.getFirstName());
        user.setLastName(updateDTO.getLastName());
        user.setHeadline(updateDTO.getHeadline());
        user.setBio(updateDTO.getBio());
        user.setLocation(updateDTO.getLocation());
        user.setWebsite(updateDTO.getWebsite());
        user.setWorkExperience(updateDTO.getWorkExperience());
        user.setEducation(updateDTO.getEducation());
        user.setSkills(updateDTO.getSkills());
        user.setCertifications(updateDTO.getCertifications());
        user.setLanguages(updateDTO.getLanguages());

        User savedUser = userRepository.save(user);
        return convertToProfileDTO(savedUser);
    }

    public ProfileDTO updateProfilePicture(String email, MultipartFile file) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setProfilePicture(Base64.getEncoder().encodeToString(file.getBytes()));
            User savedUser = userRepository.save(user);
            return convertToProfileDTO(savedUser);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process profile picture", e);
        }
    }

    public void connectWith(String userEmail, String targetUsername) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findByUsername(targetUsername)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        user.getFollowing().add(targetUser.getId());
        targetUser.getFollowers().add(user.getId());
        user.setConnectionCount(user.getConnectionCount() + 1);
        targetUser.setConnectionCount(targetUser.getConnectionCount() + 1);

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
        user.setConnectionCount(user.getConnectionCount() - 1);
        targetUser.setConnectionCount(targetUser.getConnectionCount() - 1);

        userRepository.save(user);
        userRepository.save(targetUser);
    }

    private ProfileDTO convertToProfileDTO(User user) {
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
        dto.setConnectionCount(user.getConnectionCount());
        dto.setPostCount(user.getPostCount());
        return dto;
    }
}