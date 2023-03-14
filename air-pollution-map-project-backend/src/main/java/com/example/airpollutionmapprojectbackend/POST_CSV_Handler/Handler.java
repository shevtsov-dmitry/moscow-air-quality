package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import jakarta.persistence.*;

import java.sql.Date;
@Entity
@Table(name ="air_pollution_csv_table")
public class Handler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;
    private  Date date;
    private  long global_id;
    @Column(name ="AdmArea")
    private  String AdmArea;
    private  String District;
    private  double Longitude;
    private  double Latitude;
    private  String Location;
    private  String Results;

    public Handler() {
    }

    public Handler(long id, Date date, long global_id, String admArea, String district,
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

    public Handler(Date date, long global_id, String admArea, String district,
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getGlobal_id() {
        return global_id;
    }

    public void setGlobal_id(long global_id) {
        this.global_id = global_id;
    }

    public String getAdmArea() {
        return AdmArea;
    }

    public void setAdmArea(String admArea) {
        AdmArea = admArea;
    }

    public String getDistrict() {
        return District;
    }

    public void setDistrict(String district) {
        District = district;
    }

    public double getLongitude() {
        return Longitude;
    }

    public void setLongitude(double longitude) {
        Longitude = longitude;
    }

    public double getLatitude() {
        return Latitude;
    }

    public void setLatitude(double latitude) {
        Latitude = latitude;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getResults() {
        return Results;
    }

    public void setResults(String results) {
        Results = results;
    }

    @Override
    public String toString() {
        return "Handler{" +
                "date=" + date +
                ", global_id=" + global_id +
                ", AdmArea='" + AdmArea + '\'' +
                ", District='" + District + '\'' +
                ", Longitude=" + Longitude +
                ", Latitude=" + Latitude +
                ", Location='" + Location + '\'' +
                ", Results='" + Results + '\'' +
                '}';
    }
}
