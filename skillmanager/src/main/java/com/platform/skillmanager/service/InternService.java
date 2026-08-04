package com.platform.skillmanager.service;

import com.platform.skillmanager.dto.AddSkillRequest;
import com.platform.skillmanager.dto.UpdateProfileRequest;
import com.platform.skillmanager.dto.UpdateSkillRequest;
import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.model.Skill;
import com.platform.skillmanager.model.SkillLevel;
import com.platform.skillmanager.repository.InternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class InternService {

    @Autowired
    private InternRepository internRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Intern registerIntern(Intern intern) {

        if (internRepository.existsByEmail(intern.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        intern.setPassword(passwordEncoder.encode(intern.getPassword()));
        return internRepository.save(intern);
    }


    public Intern getProfile(String email){
        return internRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Intern not found"));
    }

    public Intern addSkill(AddSkillRequest request){
        Intern intern = internRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        boolean exists = intern.getSkills().stream()
                .anyMatch(skill -> skill.getSkillName().equalsIgnoreCase(request.getSkillName()));

        if(exists){
            throw new RuntimeException("Skill already exists");
        }

        Skill skill = new Skill();
        skill.setSkillName(request.getSkillName());

        skill.setSkillLevel(SkillLevel.valueOf(request.getSkillLevel().toUpperCase()));
        intern.getSkills().add(skill);
        intern.getActivity().put(LocalDate.now().toString(), "add");

        return internRepository.save(intern);
    }

    public Intern updateSkill(UpdateSkillRequest request){
        Intern intern = internRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Intern not found."));

        boolean found = false;
        for(Skill skill : intern.getSkills()){
            if(skill.getSkillName().equalsIgnoreCase(request.getExistingSkill())){
                skill.setSkillLevel(
                        SkillLevel.valueOf(request.getNewSkillLevel().toUpperCase())
                );
                found = true;
                break;
            }
        }
        if(!found){
            throw new RuntimeException("Skill not found");
        }

        intern.getActivity().put(LocalDate.now().toString(), "modify");
        return internRepository.save(intern);
    }

    public Intern updateProfile(String email, UpdateProfileRequest request){

        Intern intern = internRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        intern.setPhone(request.getPhone());
        intern.setGithub(request.getGithub());
        intern.setLinkedin(request.getLinkedin());
        intern.setLeetcode(request.getLeetcode());

        return internRepository.save(intern);
    }
}