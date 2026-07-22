package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AISearchRequest {
    private String query;

    public AISearchRequest(){}
    public AISearchRequest(String query) {
        this.query = query;
    }
}
