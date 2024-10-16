package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestOrderDetails {

    @NotBlank(message = "isbn is Empty.")
    private String isbn;
    @NotBlank(message = "title is Empty.")
    private String title;
    @Min(value = 1, message = "The price must be greater than 1.")
    private long price;
    @NotBlank(message = "cover is Empty.")
    private String cover;
    @NotBlank(message = "author is Empty.")
    private String author;
    @Min(value = 1, message = "The quantity must be greater than 1.")
    private int quantity;
}
