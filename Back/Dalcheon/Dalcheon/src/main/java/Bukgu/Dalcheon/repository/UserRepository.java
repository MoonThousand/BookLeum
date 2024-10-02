package Bukgu.Dalcheon.repository;


import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Boolean existsByUserId(String userId);

    //username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
    UserEntity findByUserId(String userId);
}