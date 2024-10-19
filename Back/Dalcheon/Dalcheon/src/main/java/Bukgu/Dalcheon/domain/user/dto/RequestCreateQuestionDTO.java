package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestCreateQuestionDTO {

    @NotBlank(message = "title is not Empty")
    private String title;
    @NotBlank(message = "content is not Empty")
    private String content;
}
