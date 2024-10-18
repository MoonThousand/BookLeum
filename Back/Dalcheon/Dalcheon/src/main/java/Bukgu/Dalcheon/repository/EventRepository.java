package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.admin.dao.EventDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<EventDAO, Long> {

    Optional<EventDAO> findById(Long id);

    Optional<EventDAO> findByAuthor(String author);
}
