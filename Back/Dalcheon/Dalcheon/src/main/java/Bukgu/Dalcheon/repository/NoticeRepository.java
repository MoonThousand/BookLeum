package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<NoticeDAO, Long> {

    List<NoticeDAO> findAll();

    Optional<NoticeDAO> findById(Long id);
}