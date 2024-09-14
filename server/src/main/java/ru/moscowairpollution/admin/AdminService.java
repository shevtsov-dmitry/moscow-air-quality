package ru.moscowairpollution.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    public boolean verifyAuthorization(Admin admin) {
        return repo.findByLoginAndPassword(admin.getLogin(), admin.getPassword()).isPresent();
    }
}
