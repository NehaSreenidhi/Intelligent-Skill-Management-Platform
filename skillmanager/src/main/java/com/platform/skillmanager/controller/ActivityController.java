package com.platform.skillmanager.controller;

import com.platform.skillmanager.dto.ActivityResponse;
import com.platform.skillmanager.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/activity")
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/{email}")
    public List<ActivityResponse> getActivity(
            @PathVariable String email){
        return activityService.getActivity(email);
    }

}
