package Bukgu.Dalcheon.domain.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestEventCreateDTO {

    @NotBlank(message = "title is not Empty")
    private String title;
    @NotBlank(message = "content is not Empty")
    private String content;
    @NotBlank(message = "userId is not Empty")
    private String userId;
}
