package com.example.airpollutionmapprojectbackend.SQLScripts;

import com.example.airpollutionmapprojectbackend.POST_CSV_Handler.Handler;
import com.example.airpollutionmapprojectbackend.constants.Constants;

import java.lang.reflect.Field;
import java.util.List;
import java.util.regex.Pattern;

public class SQLScriptImportCSVToTable {
    public static String SQLCommandBuilder(List<String[]> list){
        var SQLScript = new StringBuilder();
        // add all columns from table to sql script builder
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
        SQLScript.append("INSERT INTO " + Constants.CSV_TABLE_NAME + "(");
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
                    if(fieldsCounter == fields.length - 1) i = line.length() - 1;
                    // классическая обработка каждого члена строки по стандартному разделителю в csv т.е. ";"
                    if(line.charAt(i) == ';' || fieldsCounter == fields.length - 1){ //
                        String tempString = line.substring(rememberCount,i); // выбираем один элемент между ;
                        tempString = tempString.replaceAll("[;,]","");

                        // try for number formatting
                        try{

                            int isParsebaleToInteger = Integer.parseInt(tempString);
                            SQLScript.append(tempString).append(',');
                            rememberCount = i;
                            fieldsCounter++;
                        }

                        // catch for string formatting
                        catch (Exception e){
                            // проверка обрабатываемой строки @date ли это по патерну
                            var patternDate = Pattern.compile("\\d{2}\\.\\d{2}\\.\\d{4}");
                            var matcherDate = patternDate.matcher(tempString);
                            // проверка обрабатываемой строки @double ли это по патерну
                            var patternDouble = Pattern.compile("[-+]?[0-9]*\\.?[0-9]+"); // previous: [-+]?[0-9]*\.[0-9]+
                            var matcherDouble = patternDouble.matcher(tempString);

                            if (matcherDate.matches()){
                                // Реформатирование даты под Российский формат
                                SQLScript.append("STR_TO_DATE('" + tempString + "','%d.%m.%Y')").append(',');
                                rememberCount = i;
                                fieldsCounter++;
                            }
                            // FIXME
                            // до сих пор не понял почему не считывается последний символ и написал вспомогательную конструкцию
                            else if(fieldsCounter == fields.length - 1){
                                SQLScript.append(tempString).append(line.charAt(line.length()-1)).append(',');
                                rememberCount = i;
                            }
                            else if(matcherDouble.matches()){
                                SQLScript.append(tempString).append(',');
                                rememberCount = i;
                                fieldsCounter++;
                            }
                            else {
                                SQLScript.append("'" + tempString + "'").append(',');
                                rememberCount = i;
                                fieldsCounter++;
                            }
                        }
                    }
                }

                SQLScript.deleteCharAt(SQLScript.length() - 1);
                SQLScript.append("),\n"); // next line
            }
        }
        SQLScript.delete(SQLScript.length() - 2, SQLScript.length() - 1); // удалить последнюю запятую из последней строки  когда всё считалось
        SQLScript.append(";");
        return SQLScript.toString();
    }
}
