package com.example.airpollutionmapprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class AirPollutionMapProjectBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AirPollutionMapProjectBackendApplication.class, args);
    }
    //@GetMapping (value = "/", produces = MediaType.TEXT_HTML_VALUE)
    @GetMapping("/")
    public String mainPage(){
        return "templates/index.html";
    }

}
