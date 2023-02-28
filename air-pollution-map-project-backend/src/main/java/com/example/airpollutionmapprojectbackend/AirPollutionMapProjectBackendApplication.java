package com.example.airpollutionmapprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
@Controller
public class AirPollutionMapProjectBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AirPollutionMapProjectBackendApplication.class, args);
    }
    @RequestMapping("/")
    public String showMainPageHTML(){
        return "dynamicOutput";
    }
    @PostMapping("/")
    public String handleFormSubmission(@RequestParam("username") String username,
                                             @RequestParam("password") String password, Model model ){
        String willReturnThis = username + "\t" + password;
//        var mav = new ModelAndView("result");
//        mav.addObject("result",willReturnThis);
//        return mav;
        model.addAttribute("result", willReturnThis);
        return "result";
    }

}
