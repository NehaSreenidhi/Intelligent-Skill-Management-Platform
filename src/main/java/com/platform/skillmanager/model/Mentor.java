package com.platform.skillmanager.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "mentors")
public class Mentor {
    @Id
    private String id;
    private String email;
    private String password;
    private String name;

    public Mentor(){}

    public Mentor(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
