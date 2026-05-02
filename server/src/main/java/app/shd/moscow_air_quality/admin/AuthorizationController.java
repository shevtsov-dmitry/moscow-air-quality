package ru.moscowairpollution.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthorizationController {

    private final AdminService adminService;

    @Autowired
    public AuthorizationController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/admin")
    public boolean sendResponse(@RequestBody Admin admin) {
        Admin adminFromRequest = new Admin(admin.getLogin(), admin.getPassword());
        var verifyAdmin = new VerifyAdmin(adminService);
        return verifyAdmin.verifyAuthorization(adminFromRequest);
    }
}
