package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.OrderDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderDAO, Long> {

    Optional<OrderDAO> findAllByUserEntity_UserId(String userId);
}
