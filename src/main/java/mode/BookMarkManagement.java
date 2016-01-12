package mode;

import java.io.*;

public class BookMarkManagement {

    private File file;
    private String bookMarkPath;

    public BookMarkManagement() {
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

    public void writeBookMarksData(String content)throws IOException{
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
}
