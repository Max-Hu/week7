package controller;

import mode.BookMark;

import java.io.IOException;
import java.util.ArrayList;

public class BookMarkAdd {

    private BookMark bookMark;

    public BookMarkAdd(String name, String url) {
        BookMark bookMark = new BookMark(name,url,String.valueOf(System.currentTimeMillis()/1000));
        this.bookMark = bookMark;
    }

    private BookMarkAdd(){}

    public String addNewBookMark() throws IOException {
        mode.BookMarkManagement management = new mode.BookMarkManagement();
        ArrayList<BookMark> defaultList = management.getBookMarkListFromData();
        defaultList.add(0,bookMark);
        management.writeBookMarksData(defaultList);
        return management.bookMarkListToJson(defaultList);
    }
}
