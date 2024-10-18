package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestWishAddDTO {
    @NotBlank(message = "userId is Empty.")
    private String userId;
    @NotBlank(message = "ISBN is Empty.")
    private String isbn;
}
