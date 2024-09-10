package ru.moscowairpollution.SQLScripts;

import ru.moscowairpollution.POST_CSV_Handler.Handler;
import ru.moscowairpollution.constants.Constants;

import java.lang.reflect.Field;
import java.util.List;
import java.util.regex.Pattern;

public class SQLScriptImportCSVToTable {
    public static String SQLCommandBuilder(List<String[]> list){
        var SQLScript = new StringBuilder();
        var handler = new Handler();
        Field[] fields = handler.getClass().getDeclaredFields();
        SQLScript.append("INSERT INTO " + Constants.CSV_TABLE_NAME + "(");
        for (Field f: fields) {
            SQLScript.append(f.getName().toLowerCase() + ",");
        }
        SQLScript.deleteCharAt(SQLScript.length()-1);
        SQLScript.append(") values");
        for (int j = 1; j < list.size(); j++) {
            String[] strings = list.get(j);
            for (String line : strings) {
                SQLScript.append("(");
                int fieldsCounter = 0;
                int rememberCount = 0;
                for (int i = 0; i < line.length(); i++) {
                    if (fieldsCounter == fields.length - 1) i = line.length() - 1;
                    if (line.charAt(i) == ';' || fieldsCounter == fields.length - 1) {
                        String tempString = line.substring(rememberCount, i);
                        tempString = tempString.replaceAll("[;,]", "");
                        try {

                            int isParsebaleToInteger = Integer.parseInt(tempString);
                            SQLScript.append(tempString).append(',');
                            rememberCount = i;
                            fieldsCounter++;
                        }

                        catch (Exception e) {
                            var patternDate = Pattern.compile("\\d\\.\\d{2}\\.\\d{4}");
                            var matcherDate = patternDate.matcher(tempString);
                            var patternDouble = Pattern.compile("[-+]?[0-9]*\\.?[0-9]+");
                            var matcherDouble = patternDouble.matcher(tempString);

                            if (matcherDate.matches()){
                                SQLScript.append("'" + tempString + "'").append(',');
                                rememberCount = i;
                                fieldsCounter++;
                            }
                            else if (fieldsCounter == fields.length - 1) {
                                SQLScript.append(tempString).append(line.charAt(line.length() - 1)).append(',');
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
        SQLScript.delete(SQLScript.length() - 2, SQLScript.length() - 1);
        SQLScript.append(";");
        return SQLScript.toString();
    }
}