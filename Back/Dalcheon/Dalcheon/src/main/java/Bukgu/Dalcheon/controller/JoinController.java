package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.login.dto.JoinDTO;
import Bukgu.Dalcheon.service.JoinService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/join")
public class JoinController {

    private final JoinService joinService;

    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/new")
    public ResponseEntity<String> joinProcess(@RequestBody JoinDTO joinDTO){

        System.out.println(joinDTO.getUserId());


        return joinService.joinProcess(joinDTO);
    }
    @GetMapping("/check/userid/{userId}")
    public ResponseEntity<String> idCheck(@PathVariable(value = "userId") String userId){
        return joinService.UserIdCheck(userId);
    }
    @GetMapping("/check/password/{password}/{passwordCheck}")
    public String passwordCheck(@PathVariable(value = "password") String password,
                                @PathVariable(value = "passwordCheck") String passwordCheck){
        return joinService.PasswordCheck(password, passwordCheck);
    }
}
