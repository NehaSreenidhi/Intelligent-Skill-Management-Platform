package com.platform.skillmanager.repository;

import com.platform.skillmanager.model.Intern;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InternRepository extends MongoRepository<Intern, String> {

    // Used for login, skill update, profile fetch
    Optional<Intern> findByEmail(String email);

    // Used for duplicate email check during registration
    boolean existsByEmail(String email);

}