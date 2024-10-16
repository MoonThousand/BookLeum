package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestCartUpdateDTO {

    @NotBlank(message = "userId is Empty.")
    private String userId;
    @NotBlank(message = "ISBN is Empty.")
    private String isbn;
    @Min(value = 1, message = "The quantity must be greater than 1.")
    private int quantity;
}
