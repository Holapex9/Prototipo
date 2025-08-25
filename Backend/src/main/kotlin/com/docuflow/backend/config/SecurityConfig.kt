package com.docuflow.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // Desactivar CSRF para permitir peticiones desde el frontend
            .authorizeHttpRequests {
                it
                    .requestMatchers("/login").permitAll()   // Permitir login sin token
                    .requestMatchers("/upload/**").authenticated() // Requiere token
                    .anyRequest().permitAll()
            }
            .formLogin { it.disable() }  // Desactivar el login por formulario de Spring
            .httpBasic { it.disable() }  // Desactivar Basic Auth

        return http.build()
    }
}
