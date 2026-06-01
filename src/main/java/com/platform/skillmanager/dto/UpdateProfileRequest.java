package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String email;
    private String phone;
    private String linkedin;
    private String github;
    private String leetcode;
}
