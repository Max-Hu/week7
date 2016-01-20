function groupBy(data){
    return _.groupBy(data, function(object,index){
        return Math.floor(index/10) + 1; });
}

function getPageNumber(data) {
    return Math.ceil(data.length/10);
}

function getTotalNumber(data) {
    var value = "搜索到" + data.length + "个结果";
    value = "<li id=\"total\"class=\'totalNumber\' value=\"" + data.length + "\">" + value + "</li>";
    $("#top").append(value);
}

function createPageHtml(number,page){
    var strHtml = "";
    if (_.isUndefined(inputValue) || inputValue == ""){
        $.each(defaultGroup[number], function (infoIndex, info) {
            var realtime = getRealTime(info["created"]);
            strHtml += createHtml(info["title"], realtime,info["created"],info["url"])
        })
    } else if (searchData.length != 0){
        $("#jsonTip").empty();
        $.each(defaultGroup[number], function (infoIndex, info) {
            var realtime = getRealTime(info["created"]);
            var title = createHighLightTitle(info["title"], inputValue);
            strHtml += createHtml(title, realtime,info["created"],info["url"]);
        })
    }
    pageLocation = number;
    $("#jsonTip").html(strHtml);
}

function createDeleteButton(timeStamp){
    return "<button time =\'"+ timeStamp + "\' id = \""+ timeStamp
        + "\"class=\"button button-raised button-pill button-inverse buttonDelete deleteButton\" "
        + "onclick='deleteBookMark($(this).attr(\"time\"))'>删除</button>";
}

function createHighLightTitle(title, input) {
    var position = title.toLowerCase().indexOf(input.toLowerCase());
    var result = title.substring(0, position) + "<mark>";
    result += title.substring(position, position + input.length) + "</mark>";
    return result += title.substring(position + input.length, title.length);
}

function getRealTime(time) {
    var time = new Date(time * 1000);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month = month > 10 ? month : '0' + month;
    var day = time.getDay();
    day = day > 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function createHtml(title, realtime,timeStamp,url) {
    var strHtml = "";
    strHtml += "<div id=\'listitem\'>";
    strHtml += "<div class='bookmark'>";
    if (_.isUndefined(url)){
        strHtml += "<div class=\'title\' >" + title + "</div>";
    }else {
        strHtml += "<div class=\'title\' ><a href=\""+ url +"\" target=\"_blank\">" + title + "</a></div>";
    }
    strHtml += createDeleteButton(timeStamp);
    strHtml += "</div>";
    strHtml += "<div class=\'time\'>" + "Created @ " + realtime + "</div>";
    strHtml += "</div>";
    strHtml += "<hr class=\'hr\'>";
    return strHtml;
}

function cleanPage(){
    searchData = "";
    $("#jsonTip").empty();
    $("#textbox").val("");
    inputValue = "";
}

function setBookMarkData(defaultData){
    defaultGroup = groupBy(defaultData);
    getTotalNumber(defaultData);
    pageNumber = getPageNumber(defaultData);
}