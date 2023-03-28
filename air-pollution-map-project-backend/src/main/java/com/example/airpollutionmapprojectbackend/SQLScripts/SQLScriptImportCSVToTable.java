package com.example.airpollutionmapprojectbackend.SQLScripts;

import com.example.airpollutionmapprojectbackend.POST_CSV_Handler.Handler;

import java.lang.reflect.Field;
import java.sql.Date;
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
                SQLScript.append("(");

                /* добавляю новую переменную, которая будет помогать доходить считывателю строк до конца.
                суть в том, что итератор @fieldsCounter будет увеличиваться пока цикл не дойдёт до
                предпоследнего элемента @fields.length - 1, тогда проигрывается прописанное в цикле условие.
                */
                int fieldsCounter = 0;
                // Запоминает индекс в цикле, на котором остановился итератор. Используется в следующем цикле
                int rememberCount = 0;

                for (int i = 0; i < line.length(); i++) { // итерритруем по всей линии
                    // Вспомогательная конструкция для считывания последнего элемента линии
                    if(fieldsCounter == fields.length - 1) i = line.length() - 2;
                    // классическая обработка каждого члена строки по стандартному разделителю в csv т.е. ";"
                    if(line.charAt(i) == ';'){ //
                        String tempString = line.substring(rememberCount,i); // выбираем один элемент между ;
                        tempString = tempString.replaceAll("[;,]","");

                        // try for number formatting
                        try{
                            int isParsebaleToInteger = Integer.parseInt(tempString);
                            SQLScript.append(tempString).append(',');
                            // in the future want to write here parse into double
                            rememberCount = i;
                            fieldsCounter++;
                        }

                        // catch for string formatting
                        catch (Exception e){
                            SQLScript.append("'" + tempString + "'").append(',');
                            rememberCount = i;
                            fieldsCounter++;

                        }
                    }

                }

                SQLScript.deleteCharAt(SQLScript.length() - 1); // Удалить последнюю запятую в заполнении
                SQLScript.append("),\n"); // next line
            }
        }
        SQLScript.delete(SQLScript.length() - 2, SQLScript.length() - 1); // удалить последнюю запятую из последней строки  когда всё считалось
        SQLScript.append(";");
        return SQLScript.toString();
    }
}
