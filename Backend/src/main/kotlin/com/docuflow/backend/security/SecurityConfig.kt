package com.docuflow.backend.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // desactivar CSRF para simplificar
            .authorizeHttpRequests {
                it.requestMatchers("/login").permitAll() // permitir login sin token
                it.anyRequest().permitAll() // TODO: aquí luego puedes poner .authenticated() y validar JWT real
            }
            .httpBasic { it.disable() } // desactivar login básico de Spring Security
            .formLogin { it.disable() } // desactivar formulario por defecto

        return http.build()
    }
}
