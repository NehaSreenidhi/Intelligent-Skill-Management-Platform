package com.platform.skillmanager.service;

import com.platform.skillmanager.dto.LoginRequest;
import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.model.Mentor;
import com.platform.skillmanager.repository.InternRepository;
import com.platform.skillmanager.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private InternRepository internRepository;

    @Autowired
    private MentorRepository mentorRepository;

    public Object login(LoginRequest request){
        if(request.getUserType().equalsIgnoreCase("Intern")){
            Intern intern = internRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Intern not found"));
            if(!intern.getPassword().equals(request.getPassword())) {
                throw new RuntimeException("Invalid credentials.");
            }
            return intern;
        }

        else if(request.getUserType().equalsIgnoreCase("Mentor")){
            Mentor mentor = mentorRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Mentor not found."));
            if(!mentor.getPassword().equals(request.getPassword())){
                throw new RuntimeException("Invalid credentials.");
            }
            return mentor;
        }
        throw new RuntimeException("Invalid user type");
    }
}
