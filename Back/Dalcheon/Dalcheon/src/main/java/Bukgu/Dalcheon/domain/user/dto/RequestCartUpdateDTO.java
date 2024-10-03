package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;

@Getter
public class RequestCartUpdateDTO {

    private String userId;
    private String isbn;
    private int quantity;
}
