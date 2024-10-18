package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestChangePassword {
    @NotBlank(message = "userId is Empty")
    private String userId;
    @NotBlank(message = "oldPassword is Empty")
    private String oldPassword;
    @NotBlank(message = "newPassword is Empty")
    private String newPassword;
}
