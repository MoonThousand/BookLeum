package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.util.List;

@Getter
public class RequestWishDeleteDTO {

    @NotBlank(message = "userId is Empty.")
    private String userId;
    private List<String> isbn;
}
