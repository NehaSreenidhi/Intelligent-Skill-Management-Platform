package com.platform.skillmanager.service;

import com.platform.skillmanager.dto.ActivityResponse;
import com.platform.skillmanager.model.Intern;
import com.platform.skillmanager.repository.InternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ActivityService {
    @Autowired
    private InternRepository internRepository;

    public List<ActivityResponse> getActivity(String email){
        Intern intern = internRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Intern not found"));

        Map<String,String> activityMap = intern.getActivity();
        List<ActivityResponse> response = new ArrayList<>();

        int year = LocalDate.now().getYear();
        LocalDate current = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year,12,31);

        while (!current.isAfter(end)) {

            String date = current.toString();
            String activity = activityMap.get(date);

            int count = 0;

            if ("add".equals(activity))
                count = 1;
            else if ("modify".equals(activity))
                count = 2;

            response.add(new ActivityResponse(date, count));

            current = current.plusDays(1);   // <-- Missing line
        }
        return response;
    }
}
