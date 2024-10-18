package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.user.dao.OrderDAO;
import Bukgu.Dalcheon.domain.user.dao.OrderDetailsDAO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ResponseOrderHistoryDTO {

    private LocalDateTime createdDate;
    private long orderId;
    private String recipient;
    private String address;
    private String memo;

    private List<ResponseOrderDetailsDTO> responseOrderDetailsDTOS;

    public ResponseOrderHistoryDTO(OrderDAO orderDAO) {
        this.createdDate = orderDAO.getCreatedDate();
        this.orderId = orderDAO.getOrderId();
        this.recipient = orderDAO.getRecipient();
        this.address = orderDAO.getAddress();
        this.memo = orderDAO.getMemo();
    }
}
