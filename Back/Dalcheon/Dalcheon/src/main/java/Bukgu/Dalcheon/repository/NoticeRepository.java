package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeDAO, Long> {
}