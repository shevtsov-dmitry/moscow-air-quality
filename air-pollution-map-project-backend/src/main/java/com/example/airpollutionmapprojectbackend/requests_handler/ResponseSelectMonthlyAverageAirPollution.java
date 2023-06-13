package com.example.airpollutionmapprojectbackend.requests_handler;

import com.example.airpollutionmapprojectbackend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseSelectMonthlyAverageAirPollution {

    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseSelectMonthlyAverageAirPollution(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/getMonthlyAverage")
    public List<Map<String,Object>> getDataByDate(){
        String SQLscript = "SELECT monthly_average,monthly_average_pdkss FROM " + Constants.CSV_TABLE_NAME;
        return jdbcTemplate.queryForList(SQLscript);
    }
}
