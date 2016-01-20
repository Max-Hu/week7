package mode;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

public class BookMarkUtil {

    private Gson gson;

    private BookMarkManagement management;

    public BookMarkUtil() {
        this.gson = new Gson();
        this.management = new BookMarkManagement();
    }

    public ArrayList<BookMark> getBookMarkListFromData() {
        Type listType = new TypeToken<ArrayList<BookMark>>(){}.getType();
        return gson.fromJson(management.getInitBookMarksData(),listType);
    }

    public String bookMarkListToJson(ArrayList<BookMark> list){
        return gson.toJson(list);
    }

    public ArrayList<BookMark> jsonToBookMarkList(String json) throws IOException {
        Type listType = new TypeToken<ArrayList<BookMark>>(){}.getType();
        return gson.fromJson(json,listType);
    }

}
