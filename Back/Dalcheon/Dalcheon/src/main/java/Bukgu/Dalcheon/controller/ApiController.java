package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.user.dao.OrderDetailsDAO;
import Bukgu.Dalcheon.domain.user.dto.OrderDetailsDTO;
import Bukgu.Dalcheon.repository.OrderDetailsRepository;
import Bukgu.Dalcheon.service.ApiService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ApiService apiService;
    private final OrderDetailsRepository orderDetailsRepository;

    public ApiController(ApiService apiService, OrderDetailsRepository orderDetailsRepository) {
        this.apiService = apiService;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @GetMapping("/history/user/{userId}")
    public String userHistory(@PathVariable String userId) throws JsonProcessingException {
        return apiService.UserHistory(userId);
    }

    @PostMapping("/order/book")
    public String orderBook(@RequestBody OrderDetailsDTO orderDetailsDTO) {
        OrderDetailsDAO orderDetailsDAO = new OrderDetailsDAO();
        orderDetailsDAO.setUserId(orderDetailsDTO.getUserId());
        orderDetailsDAO.setBookTitle(orderDetailsDTO.getBookTitle());
        orderDetailsDAO.setBookPrice(orderDetailsDTO.getBookPrice());
        orderDetailsDAO.setBookNumber(orderDetailsDTO.getBookNumber());
        orderDetailsDAO.setDeliverStatus(orderDetailsDTO.getDeliverStatus());
        orderDetailsDAO.setIsbn(orderDetailsDTO.getIsbn());


        orderDetailsRepository.save(orderDetailsDAO);
        return "주문완료";
    }
}
