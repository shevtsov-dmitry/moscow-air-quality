package ru.airpollution_map_project_backend.POST_CSV_Handler;

import ru.airpollution_map_project_backend.SQLScripts.SQLScriptImportCSVToTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HandlerService {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public HandlerService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public void importCSV(List<String[]> csvData){
        String sqlCommand = SQLScriptImportCSVToTable.SQLCommandBuilder(csvData);
        jdbcTemplate.execute(sqlCommand);
    }
}
