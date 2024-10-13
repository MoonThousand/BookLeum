package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.admin.dao.EventDAO;
import Bukgu.Dalcheon.domain.admin.dao.NoticeDAO;
import Bukgu.Dalcheon.domain.admin.dto.RequestEventCreateDTO;
import Bukgu.Dalcheon.repository.EventRepository;
import Bukgu.Dalcheon.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final NoticeRepository noticeRepository;
    private final EventRepository eventRepository;


    public AdminService(NoticeRepository noticeRepository, EventRepository eventRepository) {
        this.noticeRepository = noticeRepository;
        this.eventRepository = eventRepository;
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

    // TODO Event 작성
    public EventDAO createEvent(RequestEventCreateDTO event) {
        EventDAO eventDAO = new EventDAO();
        eventDAO.setTitle(event.getTitle());
        eventDAO.setContent(event.getContent());
        eventDAO.setAuthor(event.getUserId());
        eventRepository.save(eventDAO);
        return eventDAO;
    }

    // TODO Event 업데이트
    public EventDAO updateEvent(Long id, RequestEventCreateDTO requestEventCreateDTO) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(requestEventCreateDTO.getTitle());
            event.setContent(requestEventCreateDTO.getContent());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("event not found with id " + id));
    }

    // TODO Event 삭제
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
