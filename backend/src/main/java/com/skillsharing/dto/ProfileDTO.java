package com.skillsharing.dto;

import com.skillsharing.model.User;
import lombok.Data;
import java.util.List;
import java.util.Set;

@Data
public class ProfileDTO {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String headline;
    private String bio;
    private String location;
    private String website;
    private String profilePicture;
    private List<User.Experience> workExperience;
    private List<User.Education> education;
    private Set<String> skills;
    private List<String> certifications;
    private List<String> languages;
    private int connectionCount;
    private int postCount;
}