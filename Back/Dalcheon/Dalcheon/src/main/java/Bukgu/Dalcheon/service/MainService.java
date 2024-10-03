package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.admin.dao.EventDAO;
import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.repository.EventRepository;
import Bukgu.Dalcheon.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MainService {

    private final NoticeRepository noticeRepository;
    private final EventRepository eventRepository;

    public MainService(NoticeRepository noticeRepository, EventRepository eventRepository) {
        this.noticeRepository = noticeRepository;
        this.eventRepository = eventRepository;
    }

    public List<NoticeDAO> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<NoticeDAO> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    public Optional<EventDAO> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    public List<EventDAO> getAllEvents() {
        return eventRepository.findAll();
    }
}
