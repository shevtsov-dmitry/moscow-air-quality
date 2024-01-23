package ru.airpollution_map_project_backend.requests_handler;

import ru.airpollution_map_project_backend.POST_CSV_Handler.Handler;
import ru.airpollution_map_project_backend.constants.Constants;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = Constants.ORIGINS, methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
public class ResponseFetchTableNames {
    @GetMapping("/getColumnNames")
    @ResponseBody
    public List<String> getData() {
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
        return Arrays.stream(fields).map(Field::getName).collect(Collectors.toList());
    }
}
