package Bukgu.Dalcheon.repository;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartDAO, Integer> {

    @Transactional
    void deleteByUserEntity_UserIdAndIsbn(String userId, String isbn);

    @Transactional
    void deleteAllByUserEntity_UserId(String userId);

    @Transactional
    void deleteByIsbn(String isbn);

    List<CartDAO> findByUserEntity_UserId(String userId);

    CartDAO findByUserEntity_UserIdAndIsbn(String userId, String isbn);

    Boolean existsByIsbn(String isbn);
}
