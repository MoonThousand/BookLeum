package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.domain.login.dao.UserEntity;
import Bukgu.Dalcheon.domain.login.dto.JoinDTO;
import Bukgu.Dalcheon.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public ResponseEntity<String> joinProcess(JoinDTO joinDTO){

        String username = joinDTO.getUserId();
        String password = joinDTO.getPassword();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {

            return new ResponseEntity<>("이미 존재하는 회원입니다.", HttpStatus.CONFLICT);
        }

        UserEntity data = new UserEntity();

        data.setUsername(username);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setEmail(joinDTO.getEmail());
        data.setName(joinDTO.getName());
        data.setPhone(joinDTO.getPhone());
        data.setAddress(joinDTO.getAddress());
        data.setBirthDate(joinDTO.getBirthDate());
        data.setRole("ROLE_ADMIN");

        userRepository.save(data);
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    // ID 중복체크
    public ResponseEntity<String> UserIdCheck(String userId){
         Boolean isExist = userRepository.existsByUsername(userId);
         if (isExist) {
             return new ResponseEntity<>("중복된 아이디입니다.", HttpStatus.CONFLICT);
         }
        return new ResponseEntity<>("사용 가능한 아이디입니다." , HttpStatus.OK);
    }

    // 비밀번호 확인
    public String PasswordCheck(String password, String passwordCheck){
        if(password.equals(passwordCheck)){
            return "비밀번호 일치";
        }
        return "비밀번호 불일치";
    }
}
