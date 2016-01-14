package mode;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;

public class BookMarkManagement {

    private File file;
    private String bookMarkPath;
    private Gson gson;

    public BookMarkManagement() {
        this.gson = new Gson();
        getDataFilePath();
    }

    public String getInitBookMarksData() throws IOException {
        InputStreamReader read = new InputStreamReader(new FileInputStream(file),"UTF-8");
        BufferedReader reader=new BufferedReader(read);
        String line;
        String fileContent = "";
        while ((line = reader.readLine()) != null) {
            fileContent += line;
        }
        reader.close();
        return fileContent;
    }

    public void writeBookMarksData(String content) throws IOException {
        OutputStream os = new FileOutputStream(new File(bookMarkPath));
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(os,"UTF-8");
        BufferedWriter writer=new BufferedWriter(outputStreamWriter);
        writer.write(content);
        writer.flush();
        writer.close();
    }

    private void getDataFilePath(){
        String path = BookMarkManagement.class.getResource("../").getFile().toString();
        bookMarkPath = path + "bookmarks.json";
        file = new File(bookMarkPath);
        if (!file.exists()){
            String gradlePath = path.substring(0,path.indexOf("classes"));
            gradlePath += "resources/main/bookmarks.json";
            file = new File(gradlePath);
        }
    }

    public ArrayList<BookMark> getBookMarkList() throws IOException {
        Type listType = new TypeToken<ArrayList<BookMark>>(){}.getType();
        return gson.fromJson(getInitBookMarksData(),listType);
    }

    public void writeBookMarksData(ArrayList<BookMark> list) throws IOException {
        writeBookMarksData(gson.toJson(list));
    }

    public String bookMarkListToJson(ArrayList<BookMark> list){
        return gson.toJson(list);
    }

    public ArrayList<BookMark> jsonToBookMarkList(String json) throws IOException {
        Type listType = new TypeToken<ArrayList<BookMark>>(){}.getType();
        return gson.fromJson(json,listType);
    }

}
