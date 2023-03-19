package com.example.airpollutionmapprojectbackend.requests_handler;

import com.example.airpollutionmapprojectbackend.POST_CSV_Handler.Handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseFetchDataFromTable {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseFetchDataFromTable(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/dataTableToWebsite")
    public List<Handler> getData() {
        String sql = "SELECT * FROM air_pollution_csv_table";
        RowMapper<Handler> rowMapper = new BeanPropertyRowMapper<>(Handler.class);
        List<Handler> handlers = jdbcTemplate.query(sql,rowMapper);
        return handlers;
    }
}
