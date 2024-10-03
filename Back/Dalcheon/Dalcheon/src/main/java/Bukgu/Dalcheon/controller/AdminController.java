package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.admin.dao.EventDAO;
import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.domain.admin.dto.RequestEventCreateDTO;
import Bukgu.Dalcheon.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/test-admin")
    public String adminP() {
        return "admin Controller";
    }

    // 모든 공지사항 조회
    @GetMapping("/notice/list")
    public List<NoticeDAO> getAllNotices() {
        return adminService.getAllNotices();
    }

    // 특정 공지사항 조회
    @GetMapping("/notice/read/{postId}")
    public ResponseEntity<NoticeDAO> getNoticeById(@PathVariable Long postId) {
        return adminService.getNoticeById(postId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 공지사항 신규 작성
    @PostMapping("/notice/create")
    public NoticeDAO createNotice(@RequestBody NoticeDAO notice) {
        return adminService.createNotice(notice);
    }

    // 특정 공지사항 업데이트
    @PutMapping("/notice/update/{postId}")
    public ResponseEntity<NoticeDAO> updateNotice(@PathVariable Long postId, @RequestBody NoticeDAO noticeDetails) {
        try {
            NoticeDAO updatedNotice = adminService.updateNotice(postId, noticeDetails);
            return ResponseEntity.ok(updatedNotice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 특정 공지사항 삭제
    @DeleteMapping("/notice/delete/{postId}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long postId) {
        adminService.deleteNotice(postId);
        return ResponseEntity.noContent().build();
    }

    // TODO 이벤트 작성
    @PostMapping("/event/create")
    public EventDAO createEvent(@RequestBody RequestEventCreateDTO event) {
        return adminService.createEvent(event);
    }
    // TODO 이벤트 업데이트
    @PutMapping("/event/update/{postId}")
    public ResponseEntity<EventDAO> updateEvent(@PathVariable Long postId, @RequestBody RequestEventCreateDTO eventDetails) {
        try {
            EventDAO updatedEvent = adminService.updateEvent(postId, eventDetails);
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // TODO 이벤트 삭제
    // 특정 공지사항 삭제
    @DeleteMapping("/event/delete/{postId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long postId) {
        adminService.deleteNotice(postId);
        return ResponseEntity.noContent().build();
    }
}
