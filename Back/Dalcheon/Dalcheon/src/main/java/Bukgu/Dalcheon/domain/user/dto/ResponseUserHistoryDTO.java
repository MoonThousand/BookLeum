package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ResponseUserHistoryDTO {

    private int id;
    private String userId;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String address;
    private LocalDate birthDate;

    public ResponseUserHistoryDTO(int id, String userId, String password, String email, String name, String phone, String address, LocalDate birthDate) {
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.birthDate = birthDate;
    }
}
