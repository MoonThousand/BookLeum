package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseWishReadDTO {

    private String userId;
    private String isbn;

    public ResponseWishReadDTO(String userId, String isbn) {
        this.userId = userId;
        this.isbn = isbn;
    }
}
