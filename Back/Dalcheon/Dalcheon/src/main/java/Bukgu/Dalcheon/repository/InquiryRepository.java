package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.InquiryDAO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryRepository extends JpaRepository<InquiryDAO, Long> {
    List<InquiryDAO> findByUserEntity_UserId(String userId);

    @Transactional
    void deleteByInquiryId(Long inquiryId);
}
