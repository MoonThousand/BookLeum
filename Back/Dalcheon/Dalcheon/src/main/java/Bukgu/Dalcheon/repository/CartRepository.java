package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartDAO, Integer> {

    List<CartDAO> findByUserEntity_UserId(String userId);
}
