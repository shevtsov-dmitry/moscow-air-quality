package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class HandlerController {
    public static List<Byte> list = new LinkedList<>();
    @PostMapping("/uploadCSV")
    public void uploadFile(@RequestBody String fileBytesJson) throws IOException {
        byte[] fileBytes = new ObjectMapper().readValue(fileBytesJson, byte[].class);
        for (byte b : fileBytes) {
            list.add(b);
        }
    }
    @GetMapping("/uploadCSV")
    public String showBytesOnScreen(){
        return list.toString();
    }
}
