package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;

@Getter
public class RequestCreateInquiryDTO {

    private String userId;
    private String inquiryType;
    private String inquiryTitle;
    private String inquiryContent;
    private String status;
}
