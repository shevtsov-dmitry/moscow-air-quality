package ru.airpollution_map_project_backend.POST_CSV_Handler;

import ru.airpollution_map_project_backend.SQLScripts.SQLScriptImportCSVToTable;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HandlerController {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public HandlerController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public static String listString = new String("");
    @PostMapping("/uploadCSV")
    public void uploadCSV(@RequestBody byte[] bytes) throws IOException, CsvException {
        var inputStream = new ByteArrayInputStream(bytes);
        var csvReader = new CSVReader(new InputStreamReader(inputStream));
        List<String[]> list = csvReader.readAll();
        SQLScriptImportCSVToTable.SQLCommandBuilder(list);
        HandlerService service = new HandlerService(jdbcTemplate);
        service.importCSV(list);
        listString = list.toString();
    }

    @GetMapping("/uploadCSV")
    public String showOutput(){
        return listString;
    }
}