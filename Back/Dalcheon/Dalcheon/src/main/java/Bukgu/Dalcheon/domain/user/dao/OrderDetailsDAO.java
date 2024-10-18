package Bukgu.Dalcheon.domain.user.dao;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
public class OrderDetailsDAO{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDAO orderDAO;

    private String title;
    private Long price;
    private String cover;
    private String author;
    private int quantity;
    private String isbn;

}
