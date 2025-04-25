package com.skillsharing.repository;

import com.skillsharing.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PostRepository extends MongoRepository<Post, String> {
    @Query(value = "{ 'authorId': ?0 }", count = true)
    long countByAuthorId(String authorId);
}