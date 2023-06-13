package com.example.airpollutionmapprojectbackend.admin;

import com.example.airpollutionmapprojectbackend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
public class AuthorizationController{
    // Создал экзесмляр класса AdminService для реализации функций VerifyAdmin и JPA
    private final AdminService adminService;
    @Autowired
    public AuthorizationController(AdminService adminService) {
        this.adminService = adminService;
    }
    // Отправка ответа на запрос о проверке логина и пароля для дальнейшей авторизации на странице
    @PostMapping("/admin")
    public boolean sendResponse(@RequestBody Admin admin){
        Admin adminFromRequest = new Admin(admin.getLogin(), admin.getPassword());
        var verifyAdmin = new VerifyAdmin(adminService);
        return verifyAdmin.verifyAuthorization(adminFromRequest);
    }
}