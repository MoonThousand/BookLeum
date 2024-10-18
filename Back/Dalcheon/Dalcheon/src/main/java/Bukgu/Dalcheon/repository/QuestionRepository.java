package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.QuestionDAO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<QuestionDAO, Long> {

    @Transactional
    void deleteByQuestionId(Long id);

    Boolean existsByQuestionId(Long id);
}
