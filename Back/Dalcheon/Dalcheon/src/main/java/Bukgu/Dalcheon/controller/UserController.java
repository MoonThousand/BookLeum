package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.admin.dao.EventDAO;
import Bukgu.Dalcheon.domain.admin.dto.RequestEventCreateDTO;
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
    public ResponseEntity<?> CartAdd(@RequestBody RequestCartAddDTO requestCartAddDTO) {
        return userService.addToCart(requestCartAddDTO);
    }

    // TODO 장바구니 물품 선택 삭제(유저ID, ISBN)
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
    public ResponseEntity<?> WishAdd(@RequestBody RequestWishAddDTO requestWishAddDTO) {
        return userService.AddWish(requestWishAddDTO);
    }

    // TODO 찜하기 품목 선택 삭제 (userId, ISBN)
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
    public String ChangePassword(@RequestBody RequestChangePassword requestChangePassword) {
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

    // TODO 이벤트 작성
    @PostMapping("/event/create")
    public EventDAO createEvent(@RequestBody RequestEventCreateDTO event) {
        return userService.createEvent(event);
    }

    // TODO 이벤트 업데이트
    @PostMapping("/event/update")
    public ResponseEntity<EventDAO> updateEvent(@RequestBody RequestEventCreateDTO eventDetails) {
        try {
            EventDAO updatedEvent = userService.updateEvent(eventDetails);
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // TODO 이벤트 삭제
    // 특정 공지사항 삭제
    @DeleteMapping("/event/delete/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        userService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
    // TODO 자주 찾는 질문 조회
    @GetMapping("/question/read")
    public ResponseEntity<?> readQuestion() {
        return userService.readQuestion();
    }

    // TODO 자주 찾는 질문 작성
    @PostMapping("/question/create")
    public ResponseEntity<?> createQuestion(@RequestBody RequestCreateQuestionDTO requestCreateQuestionDTO){
        return userService.createQuestion(requestCreateQuestionDTO);
    }
    // TODO 자주 찾는 질문 삭제
    @DeleteMapping("/question/delete/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        return userService.deleteQuestion(questionId);
    }

    // TODO 1:1문의 작성
    @PostMapping("/inquiry/create")
    public ResponseEntity<?> createInquiry(@RequestBody RequestCreateInquiryDTO requestCreateInquiryDTO) {
        return userService.createInquiry(requestCreateInquiryDTO);
    }

    // TODO 1:1문의 조회
    @GetMapping("/inquiry/read/{userId}")
    public ResponseEntity<?> readInquiry(@PathVariable String userId) {
        return userService.readInquiry(userId);
    }

    // TODO 1:1문의 삭제
    @DeleteMapping("/inquiry/delete/{inquiryId}")
    public ResponseEntity<?> deleteInquiry(@PathVariable Long inquiryId) {
        return userService.deleteInquiry(inquiryId);
    }
}
