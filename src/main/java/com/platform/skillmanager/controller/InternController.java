package com.platform.skillmanager.controller;


import com.platform.skillmanager.dto.*;
import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.service.InternService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/intern")
public class InternController {
    @Autowired
    private InternService internService;

    @PostMapping("/register")
    public Intern register(@RequestBody RegisterRequest dto){
        Intern intern = new Intern(
                dto.getName(),
                dto.getEmail(),
                dto.getPassword()
        );
        return internService.registerIntern(intern);
    }

    @GetMapping("/profile/{email}")
    public Intern getProfile(@PathVariable String email){
        return internService.getProfile(email);
    }

    @PostMapping("/add-skill")
    public Intern addSkill(@RequestBody AddSkillRequest request){
        return internService.addSkill(request);
    }

    @PutMapping("/update-skill")
    public Intern updateSkill(@RequestBody UpdateSkillRequest request){
        return internService.updateSkill(request);
    }

    @PutMapping("/profile-settings")
    public Intern updateProfile(@RequestBody UpdateProfileRequest request){
        return internService.updateProfile(request);
    }
}
