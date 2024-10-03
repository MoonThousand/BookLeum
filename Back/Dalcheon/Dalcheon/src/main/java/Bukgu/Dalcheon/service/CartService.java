package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dto.RequestCartAddDTO;
import Bukgu.Dalcheon.domain.user.dto.RequestCartDeleteDTO;
import Bukgu.Dalcheon.domain.user.dto.RequestCartUpdateDTO;
import Bukgu.Dalcheon.domain.user.dto.ResponseCartReadDTO;
import Bukgu.Dalcheon.repository.CartRepository;
import Bukgu.Dalcheon.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
  
    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    // TODO 장바구니 추가
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

    // TODO 장바구니 조회
    public List<ResponseCartReadDTO> getCartList(String userId) {
        List<ResponseCartReadDTO> cartReadDTOList = new ArrayList<>();
        List<CartDAO> cartDAOList = cartRepository.findByUserEntity_UserId(userId);
        for (CartDAO cartDAO : cartDAOList) {
            ResponseCartReadDTO responseCartReadDTO = new ResponseCartReadDTO(
                    cartDAO.getCartId(), cartDAO.getIsbn(), cartDAO.getQuantity());
            cartReadDTOList.add(responseCartReadDTO);
        }
        return cartReadDTOList;
    }

    // TODO 장바구니 한개 삭제
    public String DeleteCart(RequestCartDeleteDTO requestCartDeleteDTO) {
        try{
            cartRepository.deleteByUserEntity_UserIdAndIsbn(requestCartDeleteDTO.getUserId(), requestCartDeleteDTO.getIsbn());
        } catch(EmptyResultDataAccessException e) {
            return "삭제에 실패하였습니다. 해당 id는 DB에 존재하지 않습니다.";
        }
        return "삭제가 완료되었습니다. isbn : " + requestCartDeleteDTO.getIsbn();
    }

    // TODO 장바구니 전체 삭제
    public String DeleteCartAll(String userId) {
        try{
            cartRepository.deleteAllByUserEntity_UserId(userId);
        } catch(EmptyResultDataAccessException e) {
            return "삭제에 실패하였습니다. 해당 id는 DB에 존재하지 않습니다.";
        }
        return "삭제가 완료되었습니다. userId : " + userId;
    }

    // TODO 장바구니 품목 수량 업데이트
    public String UpdateCart(RequestCartUpdateDTO requestCartUpdateDTO) {

        CartDAO cartDAO = new CartDAO();
        try{
            cartDAO = cartRepository.findByUserEntity_UserIdAndIsbn(requestCartUpdateDTO.getUserId(), requestCartUpdateDTO.getIsbn());
        }catch(EmptyResultDataAccessException e) {
            return "해당 장바구니 품목이 없습니다.";
        }
        cartDAO.setQuantity(requestCartUpdateDTO.getQuantity());
        try{
            cartRepository.save(cartDAO);
        } catch (DataIntegrityViolationException e) {
            // 데이터 무결성 제약 조건을 위반한 경우
            System.out.println("Data integrity violation: " + e.getMessage());
        } catch (TransactionSystemException e) {
            // 트랜잭션과 관련된 예외 처리
            System.out.println("Transaction system exception: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            System.out.println("An error occurred: " + e.getMessage());
        }
        return "isbn 품목 수량 변경 성공 : " + requestCartUpdateDTO.getIsbn();
    }
}
