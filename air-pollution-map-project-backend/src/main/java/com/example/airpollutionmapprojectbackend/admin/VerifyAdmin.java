package com.example.airpollutionmapprojectbackend.admin;

import org.springframework.beans.factory.annotation.Autowired;

public class VerifyAdmin extends AuthorizationController {
    @Autowired
    private AdminRepository adminRepository;
    public static boolean verify(){


        return false;
    }


}
