package Bukgu.Dalcheon.domain.user.dao;

import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class WishDAO {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wishId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    private String isbn;
}
