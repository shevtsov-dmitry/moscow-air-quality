package com.example.airpollutionmapprojectbackend.requests_handler;


import com.example.airpollutionmapprojectbackend.constants.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseGetDataByDate {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseGetDataByDate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @PostMapping("/getDataByDate")
    @ResponseBody
    public List<Map<String,Object>> getDataByDate(@RequestBody String dateFromRequest){
        String formattedInput = dateFromRequest.replace("\"","");
        String SQLscript = "SELECT * FROM " + Constants.CSV_TABLE_NAME +
                           " WHERE date = " + "'" + formattedInput +"';";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQLscript);
        return rows;
    }
}
