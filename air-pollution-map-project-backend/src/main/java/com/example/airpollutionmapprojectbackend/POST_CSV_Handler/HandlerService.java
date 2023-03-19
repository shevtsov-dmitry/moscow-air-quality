package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HandlerService {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public HandlerService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
