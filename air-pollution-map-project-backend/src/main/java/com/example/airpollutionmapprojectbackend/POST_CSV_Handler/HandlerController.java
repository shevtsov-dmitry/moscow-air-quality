package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class HandlerController {
    public static List<String[]> list = new ArrayList<>();
    @PostMapping("/uploadCSV")
    public void uploadCSV(@RequestBody byte[] bytes) throws IOException, CsvException {
        var inputStream = new ByteArrayInputStream(bytes);
        var csvReader = new CSVReader(new InputStreamReader(inputStream));
        list = csvReader.readAll();
    }
    @GetMapping("/uploadCSV")
    public String showBytesOnScreen(){
        var sb = new StringBuilder();
        for (String[] s:
             list) {
            sb.append(Arrays.toString(s));
        }
        return sb.toString();
    }
}
