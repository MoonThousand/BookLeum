package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MainService {

    private final NoticeRepository noticeRepository;

    public MainService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public List<NoticeDAO> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<NoticeDAO> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }
}
