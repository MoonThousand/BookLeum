package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OrderDetailsDTO {
    private int userId;
    private String bookTitle;
    private Long bookPrice;
    private int number;
    private String bookNumber;
    private String deliverStatus;
    private String isbn;
}
