package ru.moscowairpollution;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class AirPollutionMapProjectBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AirPollutionMapProjectBackendApplication.class, args);
    }

}
