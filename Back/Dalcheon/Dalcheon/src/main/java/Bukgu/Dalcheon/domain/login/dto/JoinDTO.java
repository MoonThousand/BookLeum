package Bukgu.Dalcheon.domain.login.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinDTO {

    private String userId;
    private String password;
    private String passwordCheck;
    private String email;
    private String name;
    private String phone;
    private String address;
    private LocalDate birthDate;
}
