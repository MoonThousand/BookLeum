package Bukgu.Dalcheon.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ResponseReadInquiryDTO {

    private String userId;

    private List<InquiryDTO> inquiryList;
}
