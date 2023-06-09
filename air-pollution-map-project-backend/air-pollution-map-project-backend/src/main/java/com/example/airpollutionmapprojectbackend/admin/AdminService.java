package com.example.airpollutionmapprojectbackend.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    final AdminRepository adminRepository;
    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    // Взять объект Admin из базы по айди
    public Admin getAdminById(Long id){
        return adminRepository.findById(id).orElse(null);
    }
}
