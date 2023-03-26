package com.example.airpollutionmapprojectbackend.POST_CSV_Handler;

import com.example.airpollutionmapprojectbackend.constants.Constans;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = Constans.CSV_TABLE_NAME)
public class Handler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date period;
    private long global_id;
    private String station_name;
    private double latitude;
    private double longitude;
    private String Surveillance_zone_characteristics;
    private String adm_area;
    private String district;
    private String location;
    private String parameter;
    private double monthly_average;
    private double monthly_average_pdkss;

    public Handler() {
    }

    public Handler(long id, Date period, long global_id, String station_name, double latitude, double longitude,
                   String surveillance_zone_characteristics, String adm_area, String district, String location,
                   String parameter, double monthly_average, double monthly_average_pdkss) {
        this.id = id;
        this.period = period;
        this.global_id = global_id;
        this.station_name = station_name;
        this.latitude = latitude;
        this.longitude = longitude;
        Surveillance_zone_characteristics = surveillance_zone_characteristics;
        this.adm_area = adm_area;
        this.district = district;
        this.location = location;
        this.parameter = parameter;
        this.monthly_average = monthly_average;
        this.monthly_average_pdkss = monthly_average_pdkss;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getPeriod() {
        return period;
    }

    public void setPeriod(Date period) {
        this.period = period;
    }

    public long getGlobal_id() {
        return global_id;
    }

    public void setGlobal_id(long global_id) {
        this.global_id = global_id;
    }

    public String getStation_name() {
        return station_name;
    }

    public void setStation_name(String station_name) {
        this.station_name = station_name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getSurveillance_zone_characteristics() {
        return Surveillance_zone_characteristics;
    }

    public void setSurveillance_zone_characteristics(String surveillance_zone_characteristics) {
        Surveillance_zone_characteristics = surveillance_zone_characteristics;
    }

    public String getAdm_area() {
        return adm_area;
    }

    public void setAdm_area(String adm_area) {
        this.adm_area = adm_area;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public double getMonthly_average() {
        return monthly_average;
    }

    public void setMonthly_average(double monthly_average) {
        this.monthly_average = monthly_average;
    }

    public double getMonthly_average_pdkss() {
        return monthly_average_pdkss;
    }

    public void setMonthly_average_pdkss(double monthly_average_pdkss) {
        this.monthly_average_pdkss = monthly_average_pdkss;
    }

    @Override
    public String toString() {
        return "Handler{" +
                "id=" + id +
                ", period=" + period +
                ", global_id=" + global_id +
                ", station_name='" + station_name + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", Surveillance_zone_characteristics='" + Surveillance_zone_characteristics + '\'' +
                ", adm_area='" + adm_area + '\'' +
                ", district='" + district + '\'' +
                ", location='" + location + '\'' +
                ", parameter='" + parameter + '\'' +
                ", monthly_average=" + monthly_average +
                ", monthly_average_pdkss=" + monthly_average_pdkss +
                '}';
    }
}
