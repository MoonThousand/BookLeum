package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class RequestWishDeleteDTO {

    private String userId;
    private List<String> isbn;
}
