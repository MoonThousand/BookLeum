package Bukgu.Dalcheon.domain.user.dao;

import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cart")
@Getter
@Setter
public class CartDAO {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    private String isbn;
    private int quantity;
}
