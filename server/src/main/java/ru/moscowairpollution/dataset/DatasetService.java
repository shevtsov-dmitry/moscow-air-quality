package ru.moscowairpollution.dataset;

import ru.moscowairpollution.SQLScripts.SQLScriptImportCSVToTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DatasetService {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public DatasetService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public void importCSV(List<String[]> csvData){
        String sqlCommand = SQLScriptImportCSVToTable.SQLCommandBuilder(csvData);
        jdbcTemplate.execute(sqlCommand);
    }
}
