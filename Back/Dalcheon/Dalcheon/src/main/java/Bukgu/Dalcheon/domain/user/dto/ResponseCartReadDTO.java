package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseCartReadDTO {
    private int cartId;
    private String isbn;
    private int quantity;

    public ResponseCartReadDTO(int cartId, String isbn, int quantity) {
        this.cartId = cartId;
        this.isbn = isbn;
        this.quantity = quantity;
    }
}
