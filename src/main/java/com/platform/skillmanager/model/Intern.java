package com.platform.skillmanager.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Setter
@Getter
@Document(collection = "interns")
public class Intern {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String linkedin;
    private String github;
    private String leetcode;
    private List<Skill> skills = new ArrayList<>();
    private Map<String, String> activity = new LinkedHashMap<>();

    public Intern(){}
    public Intern(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

