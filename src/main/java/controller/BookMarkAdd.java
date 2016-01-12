package controller;

import java.io.IOException;

public class BookMarkAdd {

    private String newBookMark;

    public BookMarkAdd(String name, String url) {
        String jsonObject = "[{\"title\": \"" + name + "\",";
        jsonObject += "\"url\": \"" + url + "\",";
        jsonObject += "\"created\": \"" + String.valueOf(System.currentTimeMillis()/1000) + "\"},";
        this.newBookMark = jsonObject;
    }

    public String addNewBookMark() throws IOException {
        mode.BookMarkManagement management = new mode.BookMarkManagement();
        String defaultData = management.getInitBookMarksData();
        String modifyData = newBookMark + defaultData.substring(1,defaultData.length());
        management.writeBookMarksData(modifyData);
        return management.getInitBookMarksData();
    }

    public String getNewBookMark() {
        return newBookMark;
    }

    public void setNewBookMark(String newBookMark) {
        this.newBookMark = newBookMark;
    }
}
