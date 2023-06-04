package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@Configuration
@EnableJpaRepositories
public class HandlerConfiguration {
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(){

    }
}
