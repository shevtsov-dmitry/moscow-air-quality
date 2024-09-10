package ru.moscowairpollution.dataset;

import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

@Repository

public class DatasetService {

    @Autowired
    private DatasetRepo repo;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    private static final Logger log = LoggerFactory.getLogger(DatasetService.class);

    public void uploadCsv(String csvFile) throws IOException, CsvException {
        Reader stringReader = new StringReader(csvFile);
        var csvParser = new CSVParserBuilder().withSeparator(';').build();
        List<String[]> csvLines;
        try (var csvReader = new CSVReaderBuilder(stringReader).withCSVParser(csvParser).build()) {
            csvLines = csvReader.readAll();
        }

        csvLines.parallelStream().skip(1).forEach(csvLineStringArray -> {
            final var dataset = new Dataset();
            for (int i = 0; i < csvLineStringArray.length; i++) {
                String s = csvLineStringArray[i];
                DatasetIndexProxy proxy = DatasetIndexProxy.values()[i];
                switch (proxy) {
                    case ID -> dataset.setId(Long.parseLong(s));
                    case PERIOD -> dataset.setDate(s);
                    case GLOBAL_ID -> dataset.setGlobalId(Long.parseLong(s));
                    case STATION_NAME -> dataset.setStationName(s);
                    case LATITUDE -> dataset.setLatitude(Double.parseDouble(s));
                    case LONGITUDE -> dataset.setLongitude(Double.parseDouble(s));
                    case SURVEILLANCE_ZONE_CHARACTERISTICS -> dataset.setSurveillanceZoneCharacteristics(s);
                    case ADM_AREA -> dataset.setAdmArea(s);
                    case DISTRICT -> dataset.setDistrict(s);
                    case LOCATION -> dataset.setLocation(s);
                    case PARAMETER -> dataset.setParameter(s);
                    case MONTHLY_AVERAGE -> dataset.setMonthlyAverage(Double.parseDouble(s));
                    case MONTHLY_AVERAGE_PD_KS -> dataset.setMonthlyAveragePdkss(Double.parseDouble(s));
                    default -> log.error("Illegal extra column used: {}", s);
                }
            }
            repo.save(dataset);
        });
    }

    public List<String> getDates() {
        return jdbcTemplate.queryForList("SELECT date FROM dataset")
                .parallelStream()
                .map(map -> map.get("date").toString())
                .toList();
    }

    enum DatasetIndexProxy {
        ID, PERIOD, GLOBAL_ID, STATION_NAME, LATITUDE, LONGITUDE, SURVEILLANCE_ZONE_CHARACTERISTICS, ADM_AREA, DISTRICT, LOCATION, PARAMETER, MONTHLY_AVERAGE, MONTHLY_AVERAGE_PD_KS;
    }

}
