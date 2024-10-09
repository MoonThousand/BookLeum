package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.WishDAO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishRepository extends JpaRepository<WishDAO, Integer> {

    List<WishDAO> findByUserEntity_UserId(String userId);

    @Transactional
    void deleteByUserEntity_UserIdAndIsbn(String userId,String isbn);

    @Transactional
    void deleteByUserEntity_UserId(String userId);

    boolean existsByIsbn(String isbn);
}
