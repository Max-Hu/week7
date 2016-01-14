package controller;

import mode.BookMark;

import java.io.IOException;
import java.util.ArrayList;

public class BookMarkDelete {

    private mode.BookMarkManagement bookMarkManagement;

    public BookMarkDelete() {
        this.bookMarkManagement = new mode.BookMarkManagement();
    }

    public String delete(String timeStamp) throws IOException {
        ArrayList<BookMark> processedList = new ArrayList<BookMark>();
        ArrayList<BookMark> defaultList = bookMarkManagement.getBookMarkList();
        for (BookMark book : defaultList) {
            if (!book.getCreated().equals(timeStamp)){
                processedList.add(book);
            }
        }
        bookMarkManagement.writeBookMarksData(processedList);
        return bookMarkManagement.bookMarkListToJson(processedList);
    }
}
