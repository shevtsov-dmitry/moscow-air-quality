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
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseFetchTableNames {
    @GetMapping("/getColumnNames")
    @ResponseBody
    public List<String> getData() {
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
        // Возвращаю все названия полей класса Handler, т.е. колонок из таблицы
        return Arrays.stream(fields).map(Field::getName).collect(Collectors.toList());

    }
}
