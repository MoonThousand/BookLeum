package Bukgu.Dalcheon.domain.user.dto;

import Bukgu.Dalcheon.domain.user.dao.QuestionDAO;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class QuestionDTO {
    private Long questionId;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdDate;

    public QuestionDTO(QuestionDAO questionDAO) {
        this.questionId = questionDAO.getQuestionId();
        this.title = questionDAO.getTitle();
        this.content = questionDAO.getContent();
        this.author = questionDAO.getAuthor();
        this.createdDate = questionDAO.getCreatedDate();
    }

}
