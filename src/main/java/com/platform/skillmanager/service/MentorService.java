package com.platform.skillmanager.service;

import com.platform.skillmanager.repository.InternRepository;
import com.platform.skillmanager.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platform.skillmanager.model.Mentor;
import com.platform.skillmanager.model.Intern;

import java.util.*;

@Service
public class MentorService {
    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private InternRepository internRepository;

    // Dashboard
    public List<Intern> getAllInterns(){
        return internRepository.findAll();
    }
    public Intern getInternProfile(String email){
        return internRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Intern not found."));
    }

    public List<Intern> searchInterns(String query) {
        List<Intern> interns = internRepository.findAll();

        // temporary
        return interns.stream()
                .filter(intern ->
                        intern.getName().toLowerCase()
                                .contains(query.toLowerCase()))
                .toList();
    }
}
