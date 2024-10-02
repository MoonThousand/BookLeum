package Bukgu.Dalcheon.domain.login.dao;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userId;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String address;
    private LocalDate birthDate;

    private String role;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartDAO> carts;
}

