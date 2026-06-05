package com.platform.skillmanager.controller;

import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.service.MentorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Mentor APIs")
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

    @GetMapping("/search")
    public List<Intern> searchInterns(@RequestParam String query){
        return mentorService.searchInterns(query);
    }
}
