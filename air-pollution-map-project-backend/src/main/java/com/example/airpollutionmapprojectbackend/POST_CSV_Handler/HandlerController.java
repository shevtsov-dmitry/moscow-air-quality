package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import com.example.airpollutionmapprojectbackend.SQLScripts.SQLScriptImportCSVToTable;
import com.example.airpollutionmapprojectbackend.constants.Constants;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
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
