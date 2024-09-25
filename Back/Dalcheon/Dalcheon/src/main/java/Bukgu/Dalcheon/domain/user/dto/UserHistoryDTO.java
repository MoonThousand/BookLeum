package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserHistoryDTO {

    private String userId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate birthDate;

    public UserHistoryDTO(String userId, String name, String email, String address, LocalDate birthDate, String phone) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.address = address;
        this.birthDate = birthDate;
        this.phone = phone;
    }
}
