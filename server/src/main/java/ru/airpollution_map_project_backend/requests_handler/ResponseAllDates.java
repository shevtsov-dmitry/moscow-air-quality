package ru.airpollution_map_project_backend.requests_handler;

import ru.airpollution_map_project_backend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseAllDates {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public ResponseAllDates(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/getDates")
    public List<String> sendDates(){
        String SQLscript = "SELECT date FROM " + Constants.CSV_TABLE_NAME;
        return getStrings(SQLscript, jdbcTemplate); // method in ResponseGetDataByDate.java
    }
    public List<String> getStrings(String SQLscript, JdbcTemplate jdbcTemplate) {
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQLscript);
        List<String> dates = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            String date = (String) row.get("date");
            dates.add(date);
        }
        return dates;
    }
}
