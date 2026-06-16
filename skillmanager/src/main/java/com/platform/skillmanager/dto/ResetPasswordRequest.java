package com.platform.skillmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {

    private String email;
    private String userType;
    private String newPassword;
}