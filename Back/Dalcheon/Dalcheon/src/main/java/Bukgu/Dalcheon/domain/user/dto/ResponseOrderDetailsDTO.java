package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.user.dao.OrderDetailsDAO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseOrderDetailsDTO {

    private String title;
    private Long price;
    private String cover;
    private String author;
    private int quantity;
    private String isbn;

    public ResponseOrderDetailsDTO(OrderDetailsDAO orderDetailsDAO) {
        this.title = orderDetailsDAO.getTitle();
        this.price = orderDetailsDAO.getPrice();
        this.cover = orderDetailsDAO.getCover();
        this.author = orderDetailsDAO.getAuthor();
        this.quantity = orderDetailsDAO.getQuantity();
        this.isbn = orderDetailsDAO.getIsbn();
    }
}
