package com.example.airpollutionmapprojectbackend.requests_handler;

import com.example.airpollutionmapprojectbackend.POST_CSV_Handler.Handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseFetchTableNames {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseFetchTableNames(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/getColumnNames")
    @ResponseBody
    public List<Handler> getData() {
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
//                "("+fields[0].getName() + "," + // id
//                    fields[1].getName() + "," + // date
//                    fields[2].getName() + "," + // global_id
//                    fields[3].getName() + "," + // admArea
//                    fields[4].getName() + "," + // District
//                    fields[5].getName() + "," + // Longitude
//                    fields[6].getName() + "," + // Latitude
//                    fields[7].getName() + "," + // Location
//                    fields[8].getName() +       // Results
//                ") values");
        return Arrays.stream(fields).toList();
    }
}
