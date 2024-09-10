package ru.moscowairpollution.requests_handler;

import ru.moscowairpollution.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
