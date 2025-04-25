package com.skillsharing.dto;

import com.skillsharing.model.User;
import lombok.Data;
import java.util.List;
import java.util.Set;

@Data
public class ProfileUpdateDTO {
    private String firstName;
    private String lastName;
    private String headline;
    private String bio;
    private String location;
    private String website;
    private List<User.Experience> workExperience;
    private List<User.Education> education;
    private Set<String> skills;
    private List<String> certifications;
    private List<String> languages;
}