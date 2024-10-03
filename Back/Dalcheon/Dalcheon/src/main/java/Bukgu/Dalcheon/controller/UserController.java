package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dto.*;
import Bukgu.Dalcheon.service.UserService;
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

    // TODO 내 정보 조회

    // TODO 내 정보 수정

    // TODO 장바구니 조회
    @GetMapping("/cart/read/{userId}")
    public List<ResponseCartReadDTO> readCart(@PathVariable String userId) {
        return userService.getCartList(userId);
    }

    // TODO 장바구니 물품 등록( 유저ID, ISBN )
    @PostMapping("/cart/add")
    public ResponseEntity<CartDAO> CartAdd(@RequestBody RequestCartAddDTO requestCartAddDTO) {
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
    public ResponseEntity<?> WishRead(@PathVariable String userId) {
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
    // TODO 구매


}
