package Bukgu.Dalcheon.component.User;

import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.user.dto.UserHistoryDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class UserHistory {

    public String userHistory(UserEntity userEntity) throws JsonProcessingException {
        UserHistoryDTO userHistoryDTO = new UserHistoryDTO(
                userEntity.getUserId(),
                userEntity.getName(),
                userEntity.getEmail(),
                userEntity.getAddress(),
                userEntity.getBirthDate(),
                userEntity.getPhone());
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(userHistoryDTO);
        return jsonString;
    }

}
