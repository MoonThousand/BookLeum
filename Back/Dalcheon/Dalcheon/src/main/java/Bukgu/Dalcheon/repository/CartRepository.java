package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartDAO, Integer> {

}
