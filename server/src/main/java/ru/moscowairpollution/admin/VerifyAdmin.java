package ru.moscowairpollution.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VerifyAdmin {
    private final AdminService adminService;

    @Autowired
    public VerifyAdmin(AdminService adminService) {
        this.adminService = adminService;
    }

    // TODO make jwt auth in admin send data
    public boolean verifyAuthorization(Admin adminFromRequest) {
        long i = 1;
        while (adminService.getAdminById(i) != null) {
            Admin adminFromDB = adminService.getAdminById(i);
            if (adminFromRequest.getLogin().equals(adminFromDB.getLogin())
                    && adminFromRequest.getPassword().equals(adminFromDB.getPassword()))
                return true;
            i++;
        }
        return false;
    }
}
