package controller;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.IOException;

public class BookMarkDelete {

    private mode.BookMarkManagement bookMarkManagement;

    public BookMarkDelete() {
        this.bookMarkManagement = new mode.BookMarkManagement();
    }

    public String delete(String timeStamp) throws IOException {
        JSONArray result = new JSONArray();
        JSONArray bookMarkList = getBookMarkList();
        for (int i = 0; i < bookMarkList.size(); i++) {
            JSONObject jo = bookMarkList.getJSONObject(i);
            if (!jo.getString("created").equals(timeStamp)){
                result.add(jo);
            }
        }
        bookMarkManagement.writeBookMarksData(result.toString());
//        return bookMarkManagement.getInitBookMarksData();
        return result.toString();
    }

    public JSONArray getBookMarkList() throws IOException{
        String defaultData = bookMarkManagement.getInitBookMarksData();
        JSONArray jsonArray = JSONArray.fromObject(defaultData);
        return  jsonArray;
    }
}
