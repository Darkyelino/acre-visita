package com.acrevisita.femapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Habilita o CORS usando a configuração que definimos no FiltroCors
            .cors(withDefaults())
            
            // 2. Desabilita o CSRF, que não é necessário para APIs REST stateless
            .csrf(csrf -> csrf.disable())

            // 3. Define as regras de autorização
            .authorizeHttpRequests(authorize -> authorize
                // Por enquanto, permite o acesso a TODAS as requisições sem autenticação
                .anyRequest().permitAll() 
            );

        return http.build();
    }
}