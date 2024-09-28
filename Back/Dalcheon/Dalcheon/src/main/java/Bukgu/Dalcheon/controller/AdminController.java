package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
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
    @GetMapping("/notice/{postId}")
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
    @PutMapping("/notice/{postId}")
    public ResponseEntity<NoticeDAO> updateNotice(@PathVariable Long postId, @RequestBody NoticeDAO noticeDetails) {
        try {
            NoticeDAO updatedNotice = adminService.updateNotice(postId, noticeDetails);
            return ResponseEntity.ok(updatedNotice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 특정 공지사항 삭제
    @DeleteMapping("/notice/{postId}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long postId) {
        adminService.deleteNotice(postId);
        return ResponseEntity.noContent().build();
    }
}
