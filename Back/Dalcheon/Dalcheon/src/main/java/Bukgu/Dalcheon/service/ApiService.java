package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.component.User.UserHistory;
import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

import java.net.URL;

@Service
public class ApiService {
    private final UserHistory userHistory;
    private final UserRepository userRepository;

    public ApiService(UserHistory userHistory, UserRepository userRepository) {
        this.userHistory = userHistory;
        this.userRepository = userRepository;
    }

    public String UserHistory(String userId) throws JsonProcessingException {
        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null) {
            return "User Not Found";
        }
        return userHistory.userHistory(userEntity);
    }


}
