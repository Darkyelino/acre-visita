package com.acrevisita.femapi.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource; // ✅ Mude a importação
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class FiltroCors {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() { // ✅ Mude o nome e o tipo de retorno
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:4200", // Apenas o que você precisa para o Angular
            "http://127.0.0.1:5500",  // Se estiver usando Live Server no VSCode
            "http://localhost" // para execução correta do container Docker
        ));
        // ✅ É uma boa prática ser explícito com os métodos
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return source; // ✅ Retorna a 'source' diretamente
    }
}