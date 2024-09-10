package ru.moscowairpollution.dataset;

import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/get/dates")
    public ResponseEntity<List<String>> getDates() {
        return ResponseEntity.ok(service.getDates());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Dataset>> getEverything() {
        return ResponseEntity.ok(service.getEverything());
    }

    @GetMapping("/get/column-names")
    @ResponseBody
    public ResponseEntity<List<String>> getColumnNames() {
        final Field[] fields = Dataset.class.getDeclaredFields();
        return ResponseEntity.ok(
                Arrays.stream(fields).map(Field::getName).toList());
    }

    @GetMapping("/get/monthly-average")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyAverage() {
        return ResponseEntity.ok(service.getMonthlyAverage());
    }

    @PostMapping("/get/by/date")
    public ResponseEntity<List<Dataset>> getByDate(@RequestBody String date) {
        return ResponseEntity.ok(service.getByDate(date));
    }

    @GetMapping("/is-data-absent")
    public ResponseEntity<Boolean> isDataAbsent() {
        return ResponseEntity.ok(service.isDataAbsent());
    }

    @DeleteMapping("/wipe-all-data")
    public ResponseEntity<Object> wipeAllData() {
        return ResponseEntity.ok(service.wipeAllData());
    }

}
