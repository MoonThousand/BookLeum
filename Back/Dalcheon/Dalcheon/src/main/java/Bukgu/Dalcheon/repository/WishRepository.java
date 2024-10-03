package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.WishDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishRepository extends JpaRepository<WishDAO, Integer> {

    List<WishDAO> findByUserEntity_UserId(String userId);
}
