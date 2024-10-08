package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dto.*;
import Bukgu.Dalcheon.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // TODO 장바구니 조회
    @GetMapping("/cart/read/{userId}")
    public List<ResponseCartReadDTO> readCart(@PathVariable String userId) throws JsonProcessingException {
        return userService.getCartList(userId);
    }

    // TODO 장바구니 물품 등록( 유저ID, ISBN )
    @PostMapping("/cart/add")
    public String CartAdd(@RequestBody RequestCartAddDTO requestCartAddDTO) {
        return userService.addToCart(requestCartAddDTO);
    }

    // TODO 장바구니 물품 품목 하나 삭제(유저ID, ISBN)
    @PostMapping("/cart/delete")
    public String CartDelete(@RequestBody RequestCartDeleteDTO requestCartDeleteDTO) {
        return userService.DeleteCart(requestCartDeleteDTO);
    }

    // TODO 장바구니 전체 삭제 (유저ID)
    @DeleteMapping("/cart/deleteAll/{userId}")
    public String CartAllDelete(@PathVariable String userId) {
        return userService.DeleteCartAll(userId);
    }

    // TODO 장바구니 품목 업데이트 (유저ID, ISBN)
    @PostMapping("/cart/update")
    public String CartUpdate(@RequestBody RequestCartUpdateDTO requestCartUpdateDTO) {
        return userService.UpdateCart(requestCartUpdateDTO);
    }

    // TODO 찜하기 조회
    @GetMapping("/wish/read/{userId}")
    public ResponseEntity<?> WishRead(@PathVariable String userId) throws JsonProcessingException {
        return userService.ReadWishList(userId);
    }

    // TODO 찜하기 등록 (유저ID, ISBN)
    @PostMapping("/wish/add")
    public String WishAdd(@RequestBody RequestWishAddDTO requestWishAddDTO) {
        return userService.AddWish(requestWishAddDTO);
    }

    // TODO 찜하기 품목 하나 삭제 (userId, ISBN)
    @PostMapping("/wish/delete")
    public String WishDelete(@RequestBody RequestWishDeleteDTO requestWishDeleteDTO) {
        return userService.DeleteWish(requestWishDeleteDTO);
    }

    // TODO 찜하기 전체 삭제(userId)
    @DeleteMapping("/wish/deleteAll/{userId}")
    public String WishAllDelete(@PathVariable String userId) {
        return userService.DeleteAllWish(userId);
    }

    // TODO 유저 히스토리 조회
    @GetMapping("/history/read/{userId}")
    public ResponseUserHistoryDTO history(@PathVariable String userId) {
        return userService.GetUserHistory(userId);
    }

    // TODO 비밀번호 변경
    @PostMapping("/history/change-password")
    public String ChangePassword(@RequestBody RequestChangePassword requestChangePassword){
        return userService.ChangePassword(requestChangePassword);
    }

    // TODO 구매
    @PostMapping("/order/purchase")
    public ResponseEntity<String> purchaseBook(@RequestBody RequestOrderDTO requestOrderDTO) {
        return userService.PurchaseBook(requestOrderDTO);
    }

    // TODO 구매 내역
    @GetMapping("/order/history/{userId}")
    public ResponseEntity<?> orderHistory(@PathVariable String userId) {
        return userService.OrderHistory(userId);
    }
}
