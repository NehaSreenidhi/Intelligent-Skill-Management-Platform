package com.platform.skillmanager.service;
import org.springframework.http.*;
import com.platform.skillmanager.dto.AIInternResponse;
import com.platform.skillmanager.dto.AISearchRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import java.util.Arrays;
import java.util.List;

@Service
public class AIService {
    private final RestTemplate restTemplate = new RestTemplate();

    private final String PYTHON_URL = "http://localhost:5001/search";

    public List<AIInternResponse> searchInterns(String query){
        AISearchRequest request = new AISearchRequest(query);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<AISearchRequest> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<AIInternResponse[]> response =
                restTemplate.postForEntity(
                        PYTHON_URL,
                        entity,
                        AIInternResponse[].class
                );

        return Arrays.asList(response.getBody());
    }
}
