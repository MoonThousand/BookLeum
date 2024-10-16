package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.purchaseStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.util.List;

@Getter
public class RequestOrderDTO {

    @NotBlank(message = "userId is Empty.")
    private String userId;
    @NotBlank(message = "recipient is Empty.")
    private String recipient;
    @NotBlank(message = "phone is Empty.")
    private String phone;
    @NotBlank(message = "address is Empty.")
    private String address;
    @NotBlank(message = "memo is Empty.")
    private String memo;
    private purchaseStatus type;

    @Valid
    private List<RequestOrderDetails> requestOrderDetailsList;
}
