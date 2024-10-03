package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.service.MainService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/main")
public class MainController {

    private final MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/")
    public String mainP() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();
        return "Main Controller : "+username + role;
    }

    // TODO 공지사항 조회

    // 특정 공지사항 조회
    @GetMapping("/notice/post/{postId}")
    public ResponseEntity<NoticeDAO> getNoticeById(@PathVariable Long postId) {
        return mainService.getNoticeById(postId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // 모든 공지사항 조회
    @GetMapping("/notice/list")
    public List<NoticeDAO> getAllNotices() {
        return mainService.getAllNotices();
    }


    // TODO 이벤트 조회

    // TODO 검색 기능
}
