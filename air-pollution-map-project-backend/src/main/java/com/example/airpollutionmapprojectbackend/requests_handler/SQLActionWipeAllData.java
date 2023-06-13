package com.example.airpollutionmapprojectbackend.requests_handler;

import com.example.airpollutionmapprojectbackend.constants.Constants;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaDelete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;

@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class SQLActionWipeAllData {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public SQLActionWipeAllData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/wipeData")
    public void wipeData() {
        jdbcTemplate.update("DELETE FROM " + Constants.CSV_TABLE_NAME);
    }
}
