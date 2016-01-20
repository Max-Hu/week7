function initPage(container, count, pageIndex){
    createPageHtml(pageIndex,count);
    setPage(container, count, pageIndex);
}
function setPage(container, count, pageIndex) {
    var a = [];
    if (pageIndex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">prev</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">prev</a>";
    }
    function setPageList() {
        if (pageIndex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    else {
        if (pageIndex <= 4) {
            for (var i = 1; i <= 5; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        } else if (pageIndex >= count - 3) {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = count - 4; i <= count; i++) {
                setPageList();
            }
        }
        else {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageIndex - 2; i <= pageIndex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageIndex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">next</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">next</a>";
    }
    container.innerHTML = a.join("");
    var pageClick = function () {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageIndex;
        oAlink[0].onclick = function () {
            if (inx == 1) {
                return false;
            }
            inx--;
            initPage(container, count, inx);
            return false;
        };
        for (var i = 1; i < oAlink.length - 1; i++) {
            oAlink[i].onclick = function () {
                inx = parseInt(this.innerHTML);
                initPage(container, count, inx);
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function () {
            if (inx == count) {
                return false;
            }
            inx++;
            initPage(container, count, inx);
            return false;
        }
    }()
}