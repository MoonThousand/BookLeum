package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.OrderDetailsDAO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetailsDAO, Long> {
}
