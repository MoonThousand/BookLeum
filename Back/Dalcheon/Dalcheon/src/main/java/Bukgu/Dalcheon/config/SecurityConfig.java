package Bukgu.Dalcheon.config;

import Bukgu.Dalcheon.jwt.CustomLogoutFilter;
import Bukgu.Dalcheon.jwt.JWTFilter;
import Bukgu.Dalcheon.jwt.JWTUtil;
import Bukgu.Dalcheon.jwt.LoginFilter;
import Bukgu.Dalcheon.repository.RefreshRepository;
import Bukgu.Dalcheon.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // AutenticationManager가 인자로 받을 AutneticationConfiguration 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    // JWTUtil 주입
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil, RefreshRepository refreshRepository, ObjectMapper objectMapper, UserRepository userRepository) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
    }
    /**
     * AutenticationManager Bean 등록
     * LoginFilter의 요소로 사용
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors((cors) -> cors
                        .configurationSource(new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                                CorsConfiguration configuration = new CorsConfiguration();

                                // 3000번대의 포트를 허용
                                configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                                // get, post 등의 메서드 허용
                                configuration.setAllowedMethods(Collections.singletonList("*"));
                                // Credentials 설정
                                configuration.setAllowCredentials(true);
                                // 헤더 설정
                                configuration.setAllowedHeaders(Collections.singletonList("*"));
                                // 허용할 시간
                                configuration.setMaxAge(3600L);
                                // 프론트로 헤더를 보내줄 때 Authorization 도 허용해줘야함
                                configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                                return configuration;
                            }
                        }));
        //csrf disable
        http
                .csrf((auth) -> auth.disable());

        //From 로그인 방식 disable
        http
                .formLogin((auth) -> auth.disable());

        //http basic 인증 방식 disable
        http
                .httpBasic((auth) -> auth.disable());

        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/login", "/main/notice/**", "/main/event/**","/join/**","/api/open/**").permitAll()
                        .requestMatchers("/user/cart/**", "/user/wish/**", "/user/history/**", "/user/order/**").permitAll()
                        .requestMatchers("/admin/notice/**","/admin/event/**", "/admin/**").hasRole("ADMIN")
                        .requestMatchers("/reissue").permitAll()
                        .anyRequest().authenticated());

        // admin 필터 등록
        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        // UsernamePasswordAuthenticationFilter를 대체해서 등록
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository, objectMapper, userRepository), UsernamePasswordAuthenticationFilter.class);
        // logout 필터 등록
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);
        //세션 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
