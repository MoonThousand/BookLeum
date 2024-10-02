package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dto.RequestCartAddDTO;
import Bukgu.Dalcheon.repository.CartRepository;
import Bukgu.Dalcheon.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
  
    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }
    public ResponseEntity<CartDAO> addToCart(RequestCartAddDTO requestCartAddDTO) {
        // UserEntity 조회
        UserEntity user = userRepository.findByUserId(requestCartAddDTO.getUserId());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // CartDAO 생성 및 설정
        CartDAO cart = new CartDAO();
        cart.setUserEntity(user);
        cart.setIsbn(requestCartAddDTO.getIsbn());
        cart.setQuantity(1);

        // CartDAO 저장
        cartRepository.save(cart);

        return ResponseEntity.ok(cart);
    }
}
