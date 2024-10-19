package Bukgu.Dalcheon.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RequestCreateInquiryDTO {

    @NotBlank(message = "userId is not Empty")
    private String userId;
    @NotBlank(message = "inquiryType is not Empty")
    private String inquiryType;
    @NotBlank(message = "inquiryTitle is not Empty")
    private String inquiryTitle;
    @NotBlank(message = "inquiryContent is not Empty")
    private String inquiryContent;
    @NotBlank(message = "status is not Empty")
    private String status;
}
