package Bukgu.Dalcheon.domain.user.dao;

import Bukgu.Dalcheon.domain.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
public class OrderDetailsDAO extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private int userId;
    private String bookTitle;
    private Long bookPrice;
    private int number;
    private String bookNumber;
    private String deliverStatus;
    private String isbn;

}
