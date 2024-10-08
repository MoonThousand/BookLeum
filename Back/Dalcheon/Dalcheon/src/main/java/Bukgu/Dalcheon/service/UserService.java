package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.component.OpenApi.ProductCheckAPI;
import Bukgu.Dalcheon.domain.OpenApi.ApiResponseDTO;
import Bukgu.Dalcheon.domain.OpenApi.CheckProduct;
import Bukgu.Dalcheon.domain.OpenApi.ItemDTO;
import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.user.dao.CartDAO;
import Bukgu.Dalcheon.domain.user.dao.OrderDAO;
import Bukgu.Dalcheon.domain.user.dao.OrderDetailsDAO;
import Bukgu.Dalcheon.domain.user.dao.WishDAO;
import Bukgu.Dalcheon.domain.user.dto.*;
import Bukgu.Dalcheon.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final OrderRepository orderRepository;
    private final ProductCheckAPI productCheckAPI;


    public UserService(BCryptPasswordEncoder bCryptPasswordEncoder, CartRepository cartRepository, UserRepository userRepository, WishRepository wishRepository, OrderRepository orderRepository, ProductCheckAPI productCheckAPI) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
        this.orderRepository = orderRepository;
        this.productCheckAPI = productCheckAPI;
    }


    // TODO 장바구니 추가
    public String addToCart(RequestCartAddDTO requestCartAddDTO) {
        // UserEntity 조회
        UserEntity user = userRepository.findByUserId(requestCartAddDTO.getUserId());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // TODO 장바구니에 원래 있는 데이터인지 검사

        // CartDAO 생성 및 설정
        CartDAO cart = new CartDAO();
        cart.setUserEntity(user);
        cart.setIsbn(requestCartAddDTO.getIsbn());
        cart.setQuantity(1);

        // CartDAO 저장
        try{
            cartRepository.save(cart);
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
        return "장바구니 추가 완료 : " + requestCartAddDTO.getIsbn();

    }

    // TODO 장바구니 조회
    public List<ResponseCartReadDTO> getCartList(String userId) throws JsonProcessingException {
        List<ResponseCartReadDTO> cartReadDTOList = new ArrayList<>();
        List<CartDAO> cartDAOList = cartRepository.findByUserEntity_UserId(userId);
        for (CartDAO cartDAO : cartDAOList) {
            CheckProduct checkProduct = new CheckProduct(cartDAO.getIsbn());
            ObjectMapper objectMapper = new ObjectMapper();
            ApiResponseDTO apiResponseDTO = objectMapper.readValue(productCheckAPI.getCheckProductJsonString(checkProduct), ApiResponseDTO.class);

            ItemDTO itemDTO = apiResponseDTO.getItems().get(0);

            ResponseCartReadDTO responseCartReadDTO = new ResponseCartReadDTO(
                    cartDAO.getCartId(), cartDAO.getIsbn(), cartDAO.getQuantity());
            responseCartReadDTO.setTitle(itemDTO.getTitle());
            responseCartReadDTO.setPrice(itemDTO.getPriceStandard());
            responseCartReadDTO.setCover(itemDTO.getCover());
            responseCartReadDTO.setAuthor(itemDTO.getAuthor());
            responseCartReadDTO.setUserId(cartDAO.getUserEntity().getUserId());

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

    // TODO 찜 목록 추가
    public String AddWish(RequestWishAddDTO requestWishAddDTO) {
        // UserEntity 조회
        UserEntity user = new UserEntity();
        try{
            user = userRepository.findByUserId(requestWishAddDTO.getUserId());
        }catch(EmptyResultDataAccessException e) {
            return "User not found";
        }

        // TODO 찜목록에 원래 있는 데이터인지 추가

        // WishDAO 생성 및 설정
        WishDAO wish = new WishDAO();
        wish.setUserEntity(user);
        wish.setIsbn(requestWishAddDTO.getIsbn());

        // WishDAO 저장
        try{
            wishRepository.save(wish);
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
        return "찜목록 추가 완료 : " + requestWishAddDTO.getIsbn();
    }

    // TODO 찜 목록 조회
    public ResponseEntity<?> ReadWishList(String userId) throws JsonProcessingException {
        // UserEntity 조회
        UserEntity user = new UserEntity();
        try{
            user = userRepository.findByUserId(userId);
        }catch(EmptyResultDataAccessException e) {
            return ResponseEntity.status(401).body("User not found");
        }
        List<ResponseWishReadDTO> responseWishReadDTOList = new ArrayList<>();
        List<WishDAO> wishDAOList = new ArrayList<>();
        try{
            wishDAOList = wishRepository.findByUserEntity_UserId(userId);
        }catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(300).body("찜 목록이 비어있습니다.");
        }
        for(WishDAO wishDAO : wishDAOList) {
            CheckProduct checkProduct = new CheckProduct(wishDAO.getIsbn());
            ObjectMapper objectMapper = new ObjectMapper();
            ApiResponseDTO apiResponseDTO = objectMapper.readValue(productCheckAPI.getCheckProductJsonString(checkProduct), ApiResponseDTO.class);

            ItemDTO itemDTO = apiResponseDTO.getItems().get(0);

            ResponseWishReadDTO responseWishReadDTO = new ResponseWishReadDTO();
            responseWishReadDTO.setUserId(wishDAO.getUserEntity().getUserId());
            responseWishReadDTO.setIsbn(wishDAO.getIsbn());
            responseWishReadDTO.setTitle(itemDTO.getTitle());
            responseWishReadDTO.setCover(itemDTO.getCover());
            responseWishReadDTO.setPrice(itemDTO.getPriceStandard());

            responseWishReadDTOList.add(responseWishReadDTO);
        }
        return ResponseEntity.ok(responseWishReadDTOList);
    }

    // TODO 찜 목록 품목 한개 삭제
    public String DeleteWish(RequestWishDeleteDTO requestWishDeleteDTO) {
        try{
            wishRepository.deleteByUserEntity_UserIdAndIsbn(requestWishDeleteDTO.getUserId(), requestWishDeleteDTO.getIsbn());
        } catch(EmptyResultDataAccessException e) {
            return "삭제에 실패하였습니다. 해당 id는 DB에 존재하지 않습니다.";
        }
        return "삭제가 완료되었습니다. isbn : " + requestWishDeleteDTO.getIsbn();
    }

    // TODO 찜 목록 전체 삭제
    public String DeleteAllWish(String userId) {
        try{
            wishRepository.deleteByUserEntity_UserId(userId);
        } catch(EmptyResultDataAccessException e) {
            return "삭제에 실패하였습니다. 해당 id는 DB에 존재하지 않습니다.";
        }
        return "삭제가 완료되었습니다. userId : " + userId + " 찜 목록 리스트 전체 삭제";
    }

    // TODO 유저 히스토리 조회
    public ResponseUserHistoryDTO GetUserHistory(String userId) {
        UserEntity user = userRepository.findByUserId(userId);

        ResponseUserHistoryDTO responseUserHistoryDTO = new ResponseUserHistoryDTO(
                user.getId(), user.getUserId(), user.getPassword(), user.getEmail(), user.getName(), user.getPhone(), user.getAddress(), user.getBirthDate()
        );
        return responseUserHistoryDTO;
    }

    // TODO 유저 패스워드 변경
    public String ChangePassword(RequestChangePassword requestChangePasswordDTO) {
        UserEntity user = userRepository.findByUserId(requestChangePasswordDTO.getUserId());
        if(bCryptPasswordEncoder.matches(requestChangePasswordDTO.getOldPassword(), user.getPassword())){
            System.out.println("비밀번호 일치함");
        }
        user.setPassword(bCryptPasswordEncoder.encode(requestChangePasswordDTO.getNewPassword()));
        userRepository.save(user);
        return "변경 성공!";
    }

    // TODO 구매
    public ResponseEntity<String> PurchaseBook(RequestOrderDTO requestOrderDTO) {
        // UserEntity 조회
        UserEntity user = new UserEntity();
        try{
            user = userRepository.findByUserId(requestOrderDTO.getUserId());
        }catch(EmptyResultDataAccessException e) {
            return ResponseEntity.status(401).body("User not found");
        }
        OrderDAO orderDAO = new OrderDAO();
        orderDAO.setUserEntity(user);
        orderDAO.setRecipient(requestOrderDTO.getRecipient());
        orderDAO.setPhone(requestOrderDTO.getPhone());
        orderDAO.setAddress(requestOrderDTO.getAddress());
        orderDAO.setMemo(requestOrderDTO.getMemo());

        List<OrderDetailsDAO> orderDetailsDAOList = new ArrayList<>();
        for (RequestOrderDetails orderDetail : requestOrderDTO.getRequestOrderDetailsList()) {
            OrderDetailsDAO orderDetailsDAO = new OrderDetailsDAO();
            orderDetailsDAO.setOrderDAO(orderDAO);
            orderDetailsDAO.setTitle(orderDetail.getTitle());
            orderDetailsDAO.setPrice(orderDetail.getPrice());
            orderDetailsDAO.setCover(orderDetail.getCover());
            orderDetailsDAO.setAuthor(orderDetail.getAuthor());
            orderDetailsDAO.setQuantity(orderDetail.getQuantity());
            orderDetailsDAO.setIsbn(orderDetail.getIsbn());

            orderDetailsDAOList.add(orderDetailsDAO);
        }
        orderDAO.setOrderDetails(orderDetailsDAOList);
        orderRepository.save(orderDAO);
        return ResponseEntity.status(200).body("구매 완료");
    }

    // TODO 구매내역
    public ResponseEntity<?> OrderHistory(String userId) {
        // UserEntity 조회
        UserEntity user = new UserEntity();
        try{
            user = userRepository.findByUserId(userId);
        }catch(EmptyResultDataAccessException e) {
            return ResponseEntity.status(401).body("User not found");
        }
        Optional<OrderDAO> orderDAOs = orderRepository.findAllByUserEntity_UserId(userId);



        // Optional이 비어 있는지 확인
        if (orderDAOs.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Order not found or access denied.");
        }
        List<ResponseOrderHistoryDTO> orderHistoryDTOS = new ArrayList<>();
        for(OrderDAO orderDAO : orderDAOs.stream().toList()) {
            ResponseOrderHistoryDTO responseOrderHistoryDTO = new ResponseOrderHistoryDTO(orderDAO);

            List<ResponseOrderDetailsDTO> responseOrderDetailsDTOS = new ArrayList<>();
            for (OrderDetailsDAO orderDetailsDAO : orderDAO.getOrderDetails()) {
                ResponseOrderDetailsDTO responseOrderDetailsDTO = new ResponseOrderDetailsDTO(orderDetailsDAO);
                responseOrderDetailsDTOS.add(responseOrderDetailsDTO);
            }
            responseOrderHistoryDTO.setResponseOrderDetailsDTOS(responseOrderDetailsDTOS);
            orderHistoryDTOS.add(responseOrderHistoryDTO);
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderHistoryDTOS);
    }
}
