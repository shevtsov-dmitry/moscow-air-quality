package com.example.airpollutionmapprojectbackend.SQLScripts;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class SQLScriptImportCSVToTable {
    public static void SQLCommandBuilder(){
        String path = "C:\\Users\\shado\\Documents\\air-pollution-map-project\\data\\air_pollution_data.csv";
        try {
            var SQLScript = new StringBuilder();
            SQLScript.append("INSERT INTO Moscow_air_pollution_data" +"(id, date, global_id,AdmArea," +
                    "District,Longitude,Latitude,Location,Results)" + " values(");
            var reader = new BufferedReader(new FileReader(path));
            String line;
            while((line = reader.readLine()) != null){
                SQLScript.append("(");
                int countCommas = 0;
                int rememberCount = 0;
                for (int i = 0; i < line.length(); i++) {
                    // number format data type
                    if(line.charAt(i) == ';' && countCommas == 0 // 0 -> id
                            || line.charAt(i) == ';' && countCommas == 1 // id -> date
                            || line.charAt(i) == ';' && countCommas == 2 //  date -> global_id
                            || line.charAt(i) == ';' && countCommas == 5 // District -> Longitude
                            || line.charAt(i) == ';' && countCommas == 6 // Longitude -> Latitude
                    )
                    {
                        while(rememberCount < i){
                            if(line.charAt(rememberCount) == ';'){}
                            else SQLScript.append(line.charAt(rememberCount));
                            rememberCount++;
                        }
                        SQLScript.append(',');
                        rememberCount = i;
                        countCommas++;

                    }
                    // String format data type
                    else if(line.charAt(i) == ';' && countCommas == 3 // global_id -> AdmArea
                            || line.charAt(i) == ';' && countCommas == 4 // AdmArea -> District
                            || line.charAt(i) == ';' && countCommas == 7 // Latitude -> Location
                            || line.charAt(i) == ';' && countCommas == 8 // Location -> Results
                            || countCommas == 9 && i == line.length() - 1// results -> end of row
                    )
                    {
                        SQLScript.append("'");
                        while(rememberCount < i){
                            if(line.charAt(rememberCount) == ';'){}
                            else SQLScript.append(line.charAt(rememberCount));
                            rememberCount++;
                        }
                        SQLScript.append("',");
                        rememberCount = i;
                        countCommas++;
                        if(countCommas == 8){
                            countCommas++; // create scenario countCommas == 9 for result -> end of row
                        }
                    }
                    else{}
                    // log
//                    System.out.println("i: " + i +"\t" + "count: " + count +"\t" + "rememberCount\t" + rememberCount + "\t count commas: " +countCommas);
                }
                SQLScript.deleteCharAt(SQLScript.length() - 1);
                SQLScript.append("),\n");
            }
            SQLScript.delete(SQLScript.length() - 2,SQLScript.length()); // delete '\n,' after last row input
            SQLScript.append(')');
            System.out.println(SQLScript);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
