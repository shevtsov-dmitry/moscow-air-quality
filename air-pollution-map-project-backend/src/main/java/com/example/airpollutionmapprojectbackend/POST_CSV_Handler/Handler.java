package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import jakarta.persistence.*;

import java.sql.Date;
@Entity
@Table(name ="air_pollution_csv_table")
public class Handler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private  String date;
    private  long global_id;
    private  String AdmArea;
    private  String District;
    private  double Longitude;
    private  double Latitude;
    private  String Location;
    private  String Results;

    public Handler() {
    }

    public Handler(Long id, String date, long global_id, String admArea, String district,
                   double longitude, double latitude, String location, String results) {
        this.id = id;
        this.date = date;
        this.global_id = global_id;
        AdmArea = admArea;
        District = district;
        Longitude = longitude;
        Latitude = latitude;
        Location = location;
        Results = results;
    }

    public Handler(String date, long global_id, String admArea, String district,
                   double longitude, double latitude, String location, String results) {
        this.date = date;
        this.global_id = global_id;
        AdmArea = admArea;
        District = district;
        Longitude = longitude;
        Latitude = latitude;
        Location = location;
        Results = results;
    }
}
