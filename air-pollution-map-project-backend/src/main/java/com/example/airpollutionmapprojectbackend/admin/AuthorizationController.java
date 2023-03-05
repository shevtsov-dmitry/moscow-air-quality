package com.example.airpollutionmapprojectbackend.admin;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST })
public class AuthorizationController{
    public static Admin adminMute; // xxxxxxxxxxxx
    @PostMapping("/admin")
    public Admin sendResponse(@RequestBody Admin admin){
        Admin adminFromRequest = new Admin(admin.getLogin(), admin.getPassword());
        return adminMute = adminFromRequest;
    }
    @GetMapping("/admin")
    public String showSmth(){
        AdminService as = new AdminService();
        return verifyAdmin.verifyString(adminMute);
    }
}
