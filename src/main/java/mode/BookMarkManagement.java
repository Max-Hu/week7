package mode;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.logging.Logger;

public class BookMarkManagement {

    private File file;
    private String bookMarkPath;
    private Gson gson;

    static Logger logger = Logger.getLogger(BookMarkManagement.class.getName());

    public BookMarkManagement() {
        this.gson = new Gson();
        getDataFilePath();
    }

    public String getInitBookMarksData() {
        try {
            InputStreamReader read = new InputStreamReader(new FileInputStream(file),"UTF-8");
            BufferedReader reader=new BufferedReader(read);
            String line;
            String fileContent = "";
            while ((line = reader.readLine()) != null) {
                fileContent += line;
            }
            reader.close();
            return fileContent;
        } catch (IOException e){
            logger.severe("[severe]Init Data Error!");
            e.printStackTrace();
            return null;
        }

    }

    public void writeBookMarksData(String content) {
        try {
            OutputStream os = new FileOutputStream(new File(bookMarkPath));
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(os,"UTF-8");
            BufferedWriter writer=new BufferedWriter(outputStreamWriter);
            writer.write(content);
            writer.flush();
            writer.close();
        } catch (IOException e){
            logger.severe("[severe]Write Data Error!");
            e.printStackTrace();
        }
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

    public ArrayList<BookMark> getBookMarkListFromData() {
        Type listType = new TypeToken<ArrayList<BookMark>>(){}.getType();
        return gson.fromJson(getInitBookMarksData(),listType);
    }

    public void writeBookMarksData(ArrayList<BookMark> list) {
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
