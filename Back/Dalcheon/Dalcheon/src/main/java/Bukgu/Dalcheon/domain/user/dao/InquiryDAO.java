package Bukgu.Dalcheon.domain.user.dao;

import Bukgu.Dalcheon.domain.BaseTimeEntity;
import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.user.dto.RequestCreateInquiryDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class InquiryDAO extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long inquiryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    private String inquiryType;
    private String inquiryTitle;
    private String inquiryContent;
    private String status;

    public InquiryDAO(RequestCreateInquiryDTO requestCreateInquiryDTO) {
        this.inquiryType = requestCreateInquiryDTO.getInquiryType();
        this.inquiryTitle = requestCreateInquiryDTO.getInquiryTitle();
        this.inquiryContent = requestCreateInquiryDTO.getInquiryContent();
        this.status = "진행 중";
    }

    public InquiryDAO() {

    }
}
