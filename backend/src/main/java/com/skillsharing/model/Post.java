package com.skillsharing.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String authorId;
    private String content;
    private String media;
    private Set<String> likes = new HashSet<>();
    private List<Comment> comments = new ArrayList<>();
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @Data
    public static class Comment {
        private String id;
        private String authorId;
        private String content;
        private Instant createdAt = Instant.now();
    }
}