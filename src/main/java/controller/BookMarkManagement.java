package controller;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.IOException;


/**
 * Created by zhihu on 15/12/8.
 [
 {
 "title": "Code Generation Network - Language Translation ...",
 "created": "1387243195"
 },
 */
public class BookMarkManagement {

    public static String add(String name, String url) throws IOException {
        String jsonObject = "[{\"title\": \"" + name + "\",";
        jsonObject += "\"url\": \"" + url + "\",";
        jsonObject += "\"created\": \"" + String.valueOf(System.currentTimeMillis()/1000) + "\"},";
        String defaultData = BookMarkData.getInitBookMarksData();
        String modifyData = jsonObject + defaultData.substring(1,defaultData.length());
        BookMarkData.writeBookMarksData(modifyData);
        return BookMarkData.getInitBookMarksData();
    }

    public static String delete(String timeStamp) throws IOException {
        String defaultData = BookMarkData.getInitBookMarksData();
        JSONArray jsonArray = JSONArray.fromObject(defaultData);
        JSONArray result = new JSONArray();
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jo = jsonArray.getJSONObject(i);
            if (!jo.getString("created").equals(timeStamp)){
                result.add(jo);
            }
        }
        BookMarkData.writeBookMarksData(result.toString());
        return BookMarkData.getInitBookMarksData();
    }

}
