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
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

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
    // ⭐️ CORS 설정
    CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setMaxAge(3600L);
            //프론트로 헤더를 보내줄 때 Authorization 도 허용해줘야함
            config.setExposedHeaders(Collections.singletonList("Authorization"));
            config.setAllowedOriginPatterns(List.of("https://bookleum.net","http://localhost:3000")); // ⭐️ 허용할 origin
            config.setAllowCredentials(true);
            return config;
        };
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                //csrf disable
                .csrf(AbstractHttpConfigurer::disable)
                //From 로그인 방식 disable
                .formLogin(AbstractHttpConfigurer::disable)
                //http basic 인증 방식 disable
                .httpBasic(AbstractHttpConfigurer::disable)
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
                //경로별 인가 작업
                .authorizeHttpRequests(authorize ->
                        authorize
                            .requestMatchers(HttpMethod.OPTIONS, "/**/*").permitAll()
                            .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                            .requestMatchers("/login", "/main/notice/**", "/main/event/**","/join/check/**","/join/new","/api/open/**").permitAll()
                            .requestMatchers("/user/cart/**", "/user/wish/**", "/user/history/**", "/user/order/**","/user/event/**","/user/inquiry/**","/user/question/**").permitAll()
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

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http
//                .cors((cors) -> cors
//                        .configurationSource(new CorsConfigurationSource() {
//                            @Override
//                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                                CorsConfiguration configuration = new CorsConfiguration();
//
//                                // 3000번대의 포트를 허용
//                                configuration.setAllowedOriginPatterns(Collections.singletonList("https://bookleum.net"));
//                                // get, post 등의 메서드 허용
//                                configuration.addAllowedMethod("Get");
//                                // Credentials 설정
//                                configuration.setAllowCredentials(true);
//                                // 헤더 설정
//                                configuration.addAllowedHeader("*");
//                                // 허용할 시간
//                                configuration.setMaxAge(3600L);
//                                // 프론트로 헤더를 보내줄 때 Authorization 도 허용해줘야함
//                                configuration.setExposedHeaders(Collections.singletonList("Authorization"));
//
//                                return configuration;
//                            }
//                        }));
//
//        http
//                //csrf disable
//                .csrf(AbstractHttpConfigurer::disable)
//                //From 로그인 방식 disable
//                .formLogin(AbstractHttpConfigurer::disable)
//                //http basic 인증 방식 disable
//                .httpBasic(AbstractHttpConfigurer::disable)
//                //경로별 인가 작업
//                .authorizeHttpRequests((auth) -> auth
//                        .requestMatchers(HttpMethod.OPTIONS, "/**/*").permitAll()
//                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
//                        .requestMatchers("/login", "/main/notice/**", "/main/event/**","/join/check/**","/join/new","/api/open/**").permitAll()
//                        .requestMatchers("/user/cart/**", "/user/wish/**", "/user/history/**", "/user/order/**","/user/event/**","/user/inquiry/**","/user/question/**").permitAll()
//                        .requestMatchers("/admin/notice/**","/admin/event/**", "/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/reissue").permitAll()
//                        .anyRequest().authenticated());
//
//        // admin 필터 등록
//        http
//                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);
//
//        // UsernamePasswordAuthenticationFilter를 대체해서 등록
//        http
//                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository, objectMapper, userRepository), UsernamePasswordAuthenticationFilter.class);
//        // logout 필터 등록
//        http
//                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);
//        //세션 설정
//        http
//                .sessionManagement((session) -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        return http.build();
//    }
}
