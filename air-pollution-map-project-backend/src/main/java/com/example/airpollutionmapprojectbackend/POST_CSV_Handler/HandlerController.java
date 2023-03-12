package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

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
    public static String mutual;
    @PostMapping("/uploadCSV")
    public String uploadCSV(@RequestBody byte[] bytes) throws IOException, CsvException {
        var inputStream = new ByteArrayInputStream(bytes);
        var csvReader = new CSVReader(new InputStreamReader(inputStream));
        list = csvReader.readAll();
        return list.toString();

    }
    @GetMapping(value = "/uploadCSV")
    public String showBytesOnScreen(){
        var sb = new StringBuilder();
        for (String[] s:
             list) {
            sb.append(Arrays.toString(s));
        }
        return sb.toString();
    }
}
