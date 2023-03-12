package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import com.example.airpollutionmapprojectbackend.SQLScripts.SQLScriptImportCSVToTable;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class HandlerController {
    public static List<String[]> list = new ArrayList<>();
    @PostMapping("/uploadCSV")
    public void uploadCSV(@RequestBody byte[] bytes) throws IOException, CsvException {
        // read csv file into list
        var inputStream = new ByteArrayInputStream(bytes);
        var csvReader = new CSVReader(new InputStreamReader(inputStream));
        List<String[]> list = csvReader.readAll();
        // import csv to DB table
        SQLScriptImportCSVToTable.SQLCommandBuilder(list);
    }

}
