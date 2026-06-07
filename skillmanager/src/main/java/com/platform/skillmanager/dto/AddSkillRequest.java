package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddSkillRequest {
    private String email;
    private String skillName;
    private String skillLevel;
}
