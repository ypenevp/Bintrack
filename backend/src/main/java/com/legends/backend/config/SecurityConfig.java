package com.legends.backend.config;

import com.legends.backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .requestMatchers("/api/updates/createupdate/").hasRole("ADMIN") // Manage updates
                        .requestMatchers("/api/updates/deleteupdate/").hasRole("ADMIN")
                        .requestMatchers("/api/updates/updateupdate/").hasRole("ADMIN")
                        .requestMatchers("/api/v1/devices/**").hasRole("ADMIN")

                        .requestMatchers("/api/updates/getall/").permitAll() // View updates
                        .requestMatchers("/api/updates/getupdate/").permitAll()
                        .requestMatchers("/api/v1/sensorData/add").permitAll()

                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN", "WORKER")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}