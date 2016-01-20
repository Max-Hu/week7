package mode;

import java.util.ArrayList;

public class BookMarkDelete {

    private mode.BookMarkManagement bookMarkManagement;
    private BookMarkUtil util;

    public BookMarkDelete() {
        this.util = new BookMarkUtil();
        this.bookMarkManagement = new mode.BookMarkManagement();
    }

    public String delete(String timeStamp) {
        ArrayList<BookMark> processedList = new ArrayList<BookMark>();
        ArrayList<BookMark> defaultList = util.getBookMarkListFromData();
        for (BookMark book : defaultList) {
            if (!book.getCreated().equals(timeStamp)){
                processedList.add(book);
            }
        }
        bookMarkManagement.writeBookMarksData(util.bookMarkListToJson(processedList));
        return util.bookMarkListToJson(processedList);
    }
}
