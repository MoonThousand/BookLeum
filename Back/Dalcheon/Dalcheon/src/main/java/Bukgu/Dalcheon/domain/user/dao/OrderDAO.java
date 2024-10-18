package Bukgu.Dalcheon.domain.user.dao;

import Bukgu.Dalcheon.domain.BaseTimeEntity;
import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class OrderDAO extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long orderId;
    private String recipient;
    private String phone;
    private String address;
    private String memo;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "orderDAO", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetailsDAO> orderDetails;


}
