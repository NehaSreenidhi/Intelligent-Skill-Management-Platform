package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityResponse {
    private String date;
    private Integer count;

    public ActivityResponse(){ }

    public ActivityResponse(String date, Integer count) {
        this.date = date;
        this.count = count;
    }
}
