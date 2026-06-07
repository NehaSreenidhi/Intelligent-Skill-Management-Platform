package com.platform.skillmanager.repository;

import com.platform.skillmanager.model.Mentor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorRepository extends MongoRepository<Mentor, String> {

    // Used for login, dashboard fetch
    Optional<Mentor> findByEmail(String email);

    // Used for duplicate email check during registration
    boolean existsByEmail(String email);

}