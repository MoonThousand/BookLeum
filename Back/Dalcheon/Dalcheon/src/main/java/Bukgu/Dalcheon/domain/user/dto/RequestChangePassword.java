package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;

@Getter
public class RequestChangePassword {
    private String userId;
    private String oldPassword;
    private String newPassword;
}
