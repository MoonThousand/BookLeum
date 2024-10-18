package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestCheckPassword {

    @NotBlank(message = "userId is Empty")
    private String userId;
    @NotBlank(message = "password is Empty")
    private String password;
}
