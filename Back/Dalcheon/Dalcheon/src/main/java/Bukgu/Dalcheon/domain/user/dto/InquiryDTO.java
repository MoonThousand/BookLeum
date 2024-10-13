package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.user.dao.InquiryDAO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InquiryDTO {
    private Long inquiryId;
    private String inquiryType;
    private String inquiryTitle;
    private String inquiryContent;
    private String status;

    public InquiryDTO(InquiryDAO inquiryDAO) {
        this.inquiryId = inquiryDAO.getInquiryId();
        this.inquiryType = inquiryDAO.getInquiryType();
        this.inquiryTitle = inquiryDAO.getInquiryTitle();
        this.inquiryContent = inquiryDAO.getInquiryContent();
        this.status = inquiryDAO.getStatus();
    }
}
