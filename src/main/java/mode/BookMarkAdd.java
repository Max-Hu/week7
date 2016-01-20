package mode;

import util.BookMarkUtil;

import java.io.IOException;
import java.util.ArrayList;

public class BookMarkAdd {

    private BookMark bookMark;
    private BookMarkManagement management;
    private BookMarkUtil util;

    public BookMarkAdd(String name, String url) {
        BookMark bookMark = new BookMark(name,url,String.valueOf(System.currentTimeMillis()/1000));
        this.bookMark = bookMark;
        this.management = new mode.BookMarkManagement();
        this.util = new BookMarkUtil();
    }

    private BookMarkAdd(){}

    public String addNewBookMark() throws IOException {
        ArrayList<BookMark> defaultList = util.getBookMarkListFromData();
        defaultList.add(0,bookMark);
        management.writeBookMarksData(util.bookMarkListToJson(defaultList));
        return util.bookMarkListToJson(defaultList);
    }
}
