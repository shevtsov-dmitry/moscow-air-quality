package ru.airpollution_map_project_backend.requests_handler;

import ru.airpollution_map_project_backend.POST_CSV_Handler.Handler;
import ru.airpollution_map_project_backend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseFetchDataFromTable {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseFetchDataFromTable(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/dataTableToWebsite")
    @ResponseBody
    public ResponseEntity<List<Handler>> getData() {
        String sql = "SELECT * FROM " + Constants.CSV_TABLE_NAME;
        List<Handler> handlers = jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Handler.class));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(handlers, headers, HttpStatus.OK);
    }

}
