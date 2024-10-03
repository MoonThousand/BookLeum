package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.WishDAO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<WishDAO, Integer> {
}
