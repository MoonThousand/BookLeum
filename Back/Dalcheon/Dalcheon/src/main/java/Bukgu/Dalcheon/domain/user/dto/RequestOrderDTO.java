package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.purchaseStatus;
import lombok.Getter;

import java.util.List;

@Getter
public class RequestOrderDTO {

    private String userId;
    private String recipient;
    private String phone;
    private String address;
    private String memo;
    private purchaseStatus type;

    private List<RequestOrderDetails> requestOrderDetailsList;
}
