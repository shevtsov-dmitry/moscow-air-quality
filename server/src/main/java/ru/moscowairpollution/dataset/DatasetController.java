package ru.moscowairpollution.dataset;

import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/datasets")
public class DatasetController {

    private static final Logger log = LoggerFactory.getLogger(DatasetController.class);

    @Autowired
    public DatasetService service;

    @PostMapping(value = "/uploadCSV")
    public ResponseEntity<Object> uploadCsv(@RequestBody String csvFile) {
        try {
            service.uploadCsv(csvFile);
        } catch (IOException | CsvException e) {
            String errMes = "Error reading CSV file: " + e.getMessage();
            log.error(errMes);
            return new ResponseEntity<>(errMes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok("");
    }

//    @GetMapping("/uploadCSV")
//    public String showOutput() {
//        return listString;
//    }
}
