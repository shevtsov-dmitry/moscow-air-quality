package com.example.airpollutionmapprojectbackend.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST })
public class AuthorizationController {
    public static Admin adminFromRequest;

    @PostMapping("/admin")
    public Admin sendResponse(@RequestBody Admin admin){
        adminFromRequest = new Admin(admin.getLogin(), admin.getPassword());
        return adminFromRequest;
    }
    @GetMapping("/admin")
    public Admin visualizeObject(){
        return adminFromRequest;
    }

}
