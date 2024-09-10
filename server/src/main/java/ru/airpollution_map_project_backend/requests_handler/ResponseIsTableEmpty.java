package ru.airpollution_map_project_backend.requests_handler;

import ru.airpollution_map_project_backend.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
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

