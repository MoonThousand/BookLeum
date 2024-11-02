package Bukgu.Dalcheon.domain.login.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinDTO {

    @NotEmpty(message = "userId is not empty")
    private String userId;
    @NotEmpty(message = "password is not empty")
    private String password;
    @NotEmpty(message = "passwordCheck is not empty")
    private String passwordCheck;
    @NotEmpty(message = "email is not empty")
    private String email;
    @NotEmpty(message = "name is not empty")
    private String name;
    @NotEmpty(message = "phone is not empty")
    private String phone;
    @NotEmpty(message = "address is not empty")
    private String address;
    private LocalDate birthDate;
}
