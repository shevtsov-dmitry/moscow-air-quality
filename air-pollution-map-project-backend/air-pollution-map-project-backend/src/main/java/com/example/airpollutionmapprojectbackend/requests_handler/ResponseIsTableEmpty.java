package com.example.airpollutionmapprojectbackend.requests_handler;

import com.example.airpollutionmapprojectbackend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseIsTableEmpty {
   private final JdbcTemplate jdbcTemplate;
   @Autowired
   public ResponseIsTableEmpty(JdbcTemplate jdbcTemplate) {
       this.jdbcTemplate = jdbcTemplate;
   }
   @GetMapping("/isTableEmpty")
   public boolean isTableEmpty(){
       String SQLScript = "SELECT * FROM " + Constants.CSV_TABLE_NAME + " LIMIT 1;";
       List<Map<String, Object>> oneLineOfTable = jdbcTemplate.queryForList(SQLScript);
       return oneLineOfTable.isEmpty();
   }
}

