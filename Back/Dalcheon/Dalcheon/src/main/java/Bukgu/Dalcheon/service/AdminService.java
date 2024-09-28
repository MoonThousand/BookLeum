package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final NoticeRepository noticeRepository;

    public AdminService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public List<NoticeDAO> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<NoticeDAO> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    public NoticeDAO createNotice(NoticeDAO notice) {
        return noticeRepository.save(notice);
    }

    public NoticeDAO updateNotice(Long id, NoticeDAO noticeDetails) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setTitle(noticeDetails.getTitle());
            notice.setContent(noticeDetails.getContent());
            return noticeRepository.save(notice);
        }).orElseThrow(() -> new RuntimeException("Notice not found with id " + id));
    }

    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}
