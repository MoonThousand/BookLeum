package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class RequestCartAddDTO {

    @NotBlank(message = "userId is Empty.")
    private String userId;
    @NotBlank(message = "ISBN is Empty.")
    private String isbn;
}
