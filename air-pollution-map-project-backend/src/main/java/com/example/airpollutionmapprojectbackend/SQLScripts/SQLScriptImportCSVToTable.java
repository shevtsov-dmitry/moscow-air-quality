package com.example.airpollutionmapprojectbackend.SQLScripts;

import com.example.airpollutionmapprojectbackend.POST_CSV_Handler.Handler;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

public class SQLScriptImportCSVToTable {
    public static String SQLCommandBuilder(List<String[]> list){
        final String tableName = "air_pollution_csv_table";
        var SQLScript = new StringBuilder();
        // add all columns from table to sql script builder
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
        SQLScript.append("INSERT INTO " + tableName + "(");
        for (Field f: fields) {
            SQLScript.append(f.getName().toLowerCase() + ",");
        }
        SQLScript.deleteCharAt(SQLScript.length()-1); // delete last ',' at the end of last element
        SQLScript.append(") values");
        // main loop
        for (String[] strings : list) {
            for (String line : strings) {
                SQLScript.append("("); // deleted \n
                int countCommas = 0;
                int rememberCount = 0;

                for (int i = 0; i < line.length(); i++) {
                    // number format data type
                    if(   line.charAt(i) == ';' && countCommas == 0 // 0 -> id
                       || line.charAt(i) == ';' && countCommas == 2 //  date -> global_id
                       || line.charAt(i) == ';' && countCommas == 5 // District -> Longitude
                       || line.charAt(i) == ';' && countCommas == 6 // Longitude -> Latitude
                    ) {
                        while (rememberCount < i) {
                            if (line.charAt(rememberCount) == ';') {}
                            else SQLScript.append(line.charAt(rememberCount));
                            rememberCount++;
                        }
                        SQLScript.append(',');
                        rememberCount = i;
                        countCommas++;
                    }
                    // date SQL format
                    else if (line.charAt(i) == ';' && countCommas == 1 ) { // id -> date
                        var sbDate = new StringBuilder();
                        while(rememberCount < i){
                            if(line.charAt(rememberCount) == ';'){}
                            else sbDate.append(line.charAt(rememberCount));
                            rememberCount++;
                        }
                        SQLScript.append("STR_TO_DATE('"+sbDate+"','%d.%m.%Y')"); // Реформатирование даты под Российский формат
                        SQLScript.append(',');
                        rememberCount = i;
                        countCommas++;
                    }
                    // symbol is "\uFEFF"
                    // String format data type
                    else if (line.charAt(i) == ';' && countCommas == 3 // global_id -> AdmArea
                            || line.charAt(i) == ';' && countCommas == 4 // AdmArea -> District
                            || line.charAt(i) == ';' && countCommas == 7 // Latitude -> Location
                            || line.charAt(i) == ';' && countCommas == 8 // Location -> Results
                            || countCommas == 9 && i == line.length() - 1// results -> end of row
                    ) {
                        SQLScript.append("'");
                        while (rememberCount < i) {
                            if (line.charAt(rememberCount) == ';') {}
                            else SQLScript.append(line.charAt(rememberCount));
                            rememberCount++;
                        }
                        SQLScript.append("',");
                        rememberCount = i;
                        countCommas++;
                        if (countCommas == 8) {
                            countCommas++; // create scenario countCommas == 9 for result -> end of row
                        }
                    } else {}
                    // log
                    //System.out.println("i: " + i +"\t" + "count: " + count +"\t" + "rememberCount\t" + rememberCount + "\t count commas: " +countCommas);
                }
                SQLScript.deleteCharAt(SQLScript.length() - 1); // Удалить последнюю запятую в заполнении
                SQLScript.append("),");
            }
        }
        SQLScript.deleteCharAt(SQLScript.length() - 1); // удалить последнюю запятую из последней строки  когда всё считалось
        SQLScript.append(";");
        return SQLScript.toString();
    }
}
