package controller;

import java.io.*;

/**
 * Created by zhihu on 15/12/11.
 */
public class BookMarkData {

    public static String getInitBookMarksData() throws IOException {
        String path = BookMarkData.class.getResource("../").getFile().toString();
        String realPath = path.substring(0,path.length()-16) + "data/bookmarks.json";

        File f = new File(realPath);
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
        String path = BookMarkData.class.getResource("../").getFile().toString();
        String realPath = path.substring(0,path.length()-16) + "data/bookmarks.json";
        OutputStream os = new FileOutputStream(new File(realPath));
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(os,"UTF-8");
        BufferedWriter writer=new BufferedWriter(outputStreamWriter);
        writer.write(content);
        writer.flush();
        writer.close();
    }
}
