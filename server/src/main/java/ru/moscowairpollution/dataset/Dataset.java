package ru.moscowairpollution.dataset;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Dataset {
    @Id
    private long id;
    private String date; // TODO parse to Date type
    private long globalId;
    private String stationName;
    private double latitude;
    private double longitude;
    @Column(length = 255 * 2)
    private String surveillanceZoneCharacteristics;
    @Column(length = 255 * 2)
    private String admArea;
    @Column(length = 255 * 2)
    private String district;
    @Column(length = 255 * 2)
    private String location;
    private String parameter;
    private double monthlyAverage;
    private double monthlyAveragePdkss;
}
