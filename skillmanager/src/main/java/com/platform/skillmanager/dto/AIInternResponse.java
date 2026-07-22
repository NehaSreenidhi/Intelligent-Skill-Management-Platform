package com.platform.skillmanager.dto;
import com.platform.skillmanager.model.Skill;
import lombok.Getter;
import lombok.Setter;

import java.util.*;
@Getter
@Setter
public class AIInternResponse {
    private String name;
    private String email;
    private String phone;
    private String github;
    private String linkedin;
    private String leetcode;
    private String matchedSkill;
    private List<Skill> skills;

    public AIInternResponse() {
    }
}
