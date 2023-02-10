package org.home.rest.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain getSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeHttpRequests(
                        authorize -> authorize
                                .antMatchers("/css/*", "/js/*").permitAll()
                                .antMatchers(HttpMethod.GET, "/authorized/**").hasAnyRole("ADMIN", "DIRECTOR", "CHIEF")
                                .antMatchers(HttpMethod.GET, "/api/v1/dept/**", "/api/v1/employee/**").authenticated()
                                .antMatchers(HttpMethod.DELETE, "/api/v1/dept/5").denyAll()
                                .antMatchers(HttpMethod.DELETE, "/api/v1/dept/**").hasRole("ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/api/v1/employee/**").hasRole("ADMIN")
                                .antMatchers(HttpMethod.PUT, "/api/v1/dept/**").hasAnyRole("ADMIN", "DIRECTOR", "CLERK")
                                .antMatchers(HttpMethod.PUT, "/api/v1/employee/**", "/employeesPays").authenticated()
                )
                .formLogin()
                .loginPage("/login").permitAll()
                .defaultSuccessUrl("/dept", true)
                .and()
                .build();
    }
}
