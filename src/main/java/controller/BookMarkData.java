package controller;

import java.io.*;

public class BookMarkData {

    public static String getInitBookMarksData() throws IOException {
        String path = BookMarkData.class.getResource("../").getFile().toString();
        path += "bookmarks.json";
        File f = new File(path);
        InputStreamReader read = new InputStreamReader(new FileInputStream(f),"UTF-8");
        BufferedReader reader=new BufferedReader(read);

        String line;
        String fileContent = "";
        while ((line = reader.readLine()) != null) {
            fileContent += line;
        }
        return fileContent;
    }

    public static void writeBookMarksData(String content)throws IOException{
        String path = BookMarkData.class.getResource("..../").getFile().toString();
        path += "bookmarks.json";
        OutputStream os = new FileOutputStream(new File(path));
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(os,"UTF-8");
        BufferedWriter writer=new BufferedWriter(outputStreamWriter);
        writer.write(content);
        writer.flush();
        writer.close();
    }

}
