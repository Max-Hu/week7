package mode;

import java.io.*;
import java.util.logging.Logger;

public class BookMarkManagement {

    private File file;
    private String bookMarkPath;

    static Logger logger = Logger.getLogger(BookMarkManagement.class.getName());

    public BookMarkManagement() {
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
            logger.severe("[severe]Init Data Error!" + e.getMessage());
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
            logger.severe("[severe]Write Data Error!" + e.getMessage());
        }
    }

    private void getDataFilePath(){
        String path = BookMarkManagement.class.getResource("../").getFile().toString();
        bookMarkPath = path + "bookmarks.json";
        file = new File(bookMarkPath);
        if (!file.exists()){
            bookMarkPath = path.substring(0,path.indexOf("classes"));
            bookMarkPath += "resources/main/bookmarks.json";
            file = new File(bookMarkPath);
        }
    }

}
