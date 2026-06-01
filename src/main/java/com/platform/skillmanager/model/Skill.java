package com.platform.skillmanager.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Skill {
    private String skillName;
    private SkillLevel skillLevel;

    public Skill(){}

    public Skill(String skillName, SkillLevel skillLevel){
        this.skillName = skillName;
        this.skillLevel = skillLevel;
    }
}
