package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSkillRequest {
    private String email;
    private String existingSkill;
    private String newSkillLevel;
}
