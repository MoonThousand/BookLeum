package Bukgu.Dalcheon.jwt;

import Bukgu.Dalcheon.domain.login.dao.RefreshEntity;
import Bukgu.Dalcheon.domain.login.dto.LoginDTO;
import Bukgu.Dalcheon.repository.RefreshRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class LoginFilter  extends UsernamePasswordAuthenticationFilter {


    // TODO AuthenticationManager DI 주입
    private final AuthenticationManager authenticationManager;

    // TODO JWTUtil 주입
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final ObjectMapper objectMapper;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository, ObjectMapper objectMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest requset, HttpServletResponse response) throws AuthenticationException {

        /**
         * 요청 받은 값에서 username, password를 가져옴
         **/
//        String username = obtainUsername(requset);
//        String password = obtainPassword(requset);
//        System.out.println("username: " + username + " password: " + password);
        LoginDTO loginDTO = new LoginDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = requset.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDTO = objectMapper.readValue(messageBody, LoginDTO.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();

        /**
         * 스프링 시큐리티에서 username과 password를 검증하기 위해서 token에 담는다
         */
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

        /**
         * token에 담은 검증을 위한 AutenticationManager로 전달
         * SecurityConfig에서 등록함
         */
        return authenticationManager.authenticate(authToken);
    }
    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        //유저 정보
        String username = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        //토큰 생성
        String access = jwtUtil.createJwt("access", username, role, 600000L);
        String refresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // Refresh 토큰 저장
        addRefreshEntity(username, refresh, 86400000L);

        //응답 설정
        response.setHeader("access", access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        // 바디에 추가
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("access", access);
        jsonResponse.put("refresh", refresh);
        String token = objectMapper.writeValueAsString(jsonResponse);
        response.getWriter().write(token);

    }
    private void addRefreshEntity(String username, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {

        // 로그인 실패시 401 응답 코드 반환
        response.setStatus(401);
        response.getWriter().write("로그인 실패");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);

        /**
         * HTTPS를 사용할 경우 넣어주면 됨
         * //cookie.setSecure(true);
         * 쿠키 경로가 설정될 범위
         * //cookie.setPath("/");
         */

        //TODO 앞단 클라이언트에서 js로 해당 쿠키를 접근하지 못하도록 막는 역활
        cookie.setHttpOnly(true);

        return cookie;
    }
}
