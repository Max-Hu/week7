package mode;

import com.google.gson.annotations.SerializedName;

public class BookMark {
    @SerializedName("title")
    private String title;

    @SerializedName("url")
    private String url;

    @SerializedName("created")
    private String created;

    public BookMark(String title, String url, String created) {
        this.title = title;
        this.url = url;
        this.created = created;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }
}
