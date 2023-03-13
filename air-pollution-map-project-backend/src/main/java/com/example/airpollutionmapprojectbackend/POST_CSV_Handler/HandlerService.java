package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HandlerService {
    private final JdbcTemplate jdbcTemplate;

    public HandlerService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
