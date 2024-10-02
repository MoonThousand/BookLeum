package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dto.CartDTO;
import Bukgu.Dalcheon.domain.user.dto.RequestCartAddDTO;
import Bukgu.Dalcheon.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final CartService cartService;

    public UserController(CartService cartService) {
        this.cartService = cartService;
    }

    // TODO 내 정보 조회

    // TODO 내 정보 수정

    // TODO 장바구니 조회

    // TODO 장바구니 물품 등록( 유저ID, ISBN )
    @PostMapping("/cart/add")
    public CartDAO CartAdd(@RequestBody RequestCartAddDTO requestCartAddDTO){
        return cartService.addToCart(requestCartAddDTO);
    }

    // TODO 찜하기 조회

    // TODO 찜하기 등록 (유저ID, ISBN)

    // TODO 구매


}
