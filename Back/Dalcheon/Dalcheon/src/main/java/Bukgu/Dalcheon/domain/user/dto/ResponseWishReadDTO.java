package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseWishReadDTO {

    private String userId;
    private String isbn;
    private String title;
    private String cover;
    private long price;


    public ResponseWishReadDTO() {
    }
}
