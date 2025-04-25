package com.skillsharing.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String role; // BEGINNER, PROFESSIONAL, MENTOR
    
    // Profile Information
    private String firstName;
    private String lastName;
    private String headline;
    private String profilePicture;
    private String bio;
    private String location;
    private String website;
    
    // Professional Information
    private List<Experience> workExperience = new ArrayList<>();
    private List<Education> education = new ArrayList<>();
    private Set<String> skills = new HashSet<>();
    private List<String> certifications = new ArrayList<>();
    private List<String> languages = new ArrayList<>();
    
    // Social
    private Set<String> followers = new HashSet<>();
    private Set<String> following = new HashSet<>();
    private List<String> endorsements = new ArrayList<>();
    
    // Stats
    private int connectionCount = 0;
    private int postCount = 0;
    private boolean enabled = true;
    
    @Data
    public static class Experience {
        private String title;
        private String company;
        private String location;
        private String startDate;
        private String endDate;
        private String description;
        private boolean current;
    }
    
    @Data
    public static class Education {
        private String school;
        private String degree;
        private String fieldOfStudy;
        private String startDate;
        private String endDate;
        private String description;
    }
}
