package com.platform.skillmanager.service;

import com.platform.skillmanager.dto.JwtResponse;
import com.platform.skillmanager.dto.LoginRequest;
import com.platform.skillmanager.jwt.JwtUtil;
import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.model.Mentor;
import com.platform.skillmanager.repository.InternRepository;
import com.platform.skillmanager.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private InternRepository internRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Object login(LoginRequest request){
        System.out.println("User Type = " + request.getUserType());
        System.out.println("Email = " + request.getEmail());
        if(request.getUserType().equalsIgnoreCase("Intern")){
            Intern intern = internRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Intern not found"));
            if(!passwordEncoder.matches(request.getPassword(), intern.getPassword())) {
                throw new RuntimeException("Invalid credentials.");
            }
            String token = jwtUtil.generateToken(intern.getEmail());
            return new JwtResponse(token);
        }

        else if(request.getUserType().equalsIgnoreCase("Mentor")){
            Mentor mentor = mentorRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Mentor not found."));
            if(!mentor.getPassword().equals(request.getPassword())){
                throw new RuntimeException("Invalid credentials.");
            }
            return new JwtResponse(
                    jwtUtil.generateToken(mentor.getEmail())
            );
        }
        throw new RuntimeException("Invalid user type");
    }
}
