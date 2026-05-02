package ru.moscowairpollution;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AirPollutionMapProjectBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AirPollutionMapProjectBackendApplication.class, args);
    }

}
