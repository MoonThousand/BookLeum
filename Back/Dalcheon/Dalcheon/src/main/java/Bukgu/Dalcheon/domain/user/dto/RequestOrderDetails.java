package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestOrderDetails {

    private String isbn;
    private String title;
    private long price;
    private String cover;
    private String author;
    private int quantity;
}
