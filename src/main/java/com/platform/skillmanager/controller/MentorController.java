package com.platform.skillmanager.controller;

import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mentor")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @GetMapping("/interns")
    public List<Intern> getAllInterns(){
        return mentorService.getAllInterns();
    }

    @GetMapping("/profile/{email}")
    public Intern getInternProfile(@PathVariable String email){
        return mentorService.getInternProfile(email);
    }
}
