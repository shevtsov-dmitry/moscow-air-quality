package ru.moscowairpollution.dataset;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Dataset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String date; // TODO parse to Date type
    private long globalId;
    private String stationName;
    private double latitude;
    private double longitude;
    private String surveillanceZoneCharacteristics;
    private String admArea;
    private String district;
    private String location;
    private String parameter;
    private double monthlyAverage;
    private double monthlyAveragePdkss;
}
