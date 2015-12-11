var defaultData;
var pageLocation = 1;
var pageNumber;
var defaultgroup;
var inputValue;
var searchData;


$(function () {
    $.ajax({
        url: "init.jsp",
        data: {'command': 'init'},
        dataType: "json",
        async: false,
        success: function (data) {
            $("#jsonTip").empty();
            defaultData = data;
            defaultgroup = groupBy(defaultData);
            getTotalNumber(defaultData);
            pageNumber = getpageNumber(defaultData);
            setPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
        }
    });

    $("#textbox").on('input', function () {
        $("#top").children("li:last-child").remove();
        var value = $(this).val();
        inputValue = value;
        //$jsontip.empty();
        searchData = _.filter(defaultData, function (object) {
            return object["title"].toLowerCase().indexOf(value.toLowerCase()) != -1;
        });
        defaultgroup = groupBy(searchData);
        getTotalNumber(searchData);
        if (searchData.length != 0){
            pageNumber = getpageNumber(searchData);
        }else {
            pageNumber = 1;
        }
        setPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
    });

    $('#my-button').bind('click', function() {
        //var html = "<form id='dlg_form' method=\"post\">"
        var html = "<p type='input'>书签名称: <input id='bookMarkName' type=\"text\" name=\"markName\" /></p>";
        html += "<p type='input'>书签地址: <input id='bookMarkAddress' type=\"text\" name=\"markAddress\" /></p>";
        html += "<div class='message'></div>";
        html += "<div><button type=\"submit\" class=\"button button-glow button-rounded button-raised button-primary\" id='add' onclick='addSubmit()'>确定</button></div>";
        //html += "</form>"
        index = layer.open({
            type: 1,
            area: ['450px', '260px'],
            moveType: 1,
            shadeClose: true, //点击遮罩关闭
            title: "添加书签",
            content: html,
        });
    });

});




function getpageNumber(data) {
    return Math.ceil(data.length/10);
}

function createPageHtml(number,page){
    var strHtml = "";
    if (_.isUndefined(inputValue) || inputValue == ""){
        $.each(defaultgroup[number], function (infoIndex, info) {
            var realtime = getRealTime(info["created"]);
            strHtml += createHtml(info["title"], realtime,info["created"],info["url"])
        })
    } else if (searchData.length != 0){
        $("#jsonTip").empty();
        $.each(defaultgroup[number], function (infoIndex, info) {
            var realtime = getRealTime(info["created"]);
            var title = createHighLightTitle(info["title"], inputValue);
            strHtml += createHtml(title, realtime,info["created"],info["url"]);
        })
    }
    pageLocation = number;
    $("#jsonTip").html(strHtml);
}

function groupBy(data){
    return _.groupBy(data, function(object,index){
        return Math.floor(index/10) + 1; });
}



function getTotalNumber(data) {
    var value = "搜索到" + data.length + "个结果";
    value = "<li id=\"total\"class=\'totalNumber\' value=\"" + data.length + "\">" + value + "</li>";
    $("#top").append(value);
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

function setPage(container, count, pageindex) {
    createPageHtml(pageindex,count);
    var container = container;
    var count = count;
    var pageindex = pageindex;
    a = [];
    //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
    if (pageindex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">prev</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">prev</a>";
    }
    function setPageList() {
        if (pageindex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }

    //总页数小于10
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    //总页数大于10页
    else {
        if (pageindex <= 4) {
            for (var i = 1; i <= 5; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        } else if (pageindex >= count - 3) {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = count - 4; i <= count; i++) {
                setPageList();
            }
        }
        else { //当前页在中间部分
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageindex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">next</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">next</a>";
    }
    container.innerHTML = a.join("");
    //事件点击
    var pageClick = function () {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageindex; //初始的页码
        oAlink[0].onclick = function () { //点击上一页
            if (inx == 1) {
                return false;
            }
            inx--;
            setPage(container, count, inx);
            return false;
        };
        for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
            oAlink[i].onclick = function () {
                inx = parseInt(this.innerHTML);
                setPage(container, count, inx);
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function () { //点击下一页
            if (inx == count) {
                return false;
            }
            inx++;
            setPage(container, count, inx);
            return false;
        }
    }()
}

var index ;
function addSubmit(){
    if($("#bookMarkName").val() == ""){
        $(".message").html("书签名不能为空!");
        return false;
    }else if($("#bookMarkAddress").val() == ""){
        $(".message").html("书签地址不能为空!");
        return false;
    }else {
        var name = $("#bookMarkName").val();
        var url = $("#bookMarkAddress").val();
        if (url.toLocaleLowerCase().indexOf("http")!= 0){
            url = "http://" + url;
        }
    }
    $.ajax({
        type: "post",
        url: "add.jsp",
        data: {'title': name,'address':url},
        //data: "command=12345", //+ name + "&address=" + url + "&command=add",
        success: function (data) {
            defaultData = JSON.parse(data);
            searchData = "";
            defaultgroup = groupBy(defaultData);
            $("#top").children("li:last-child").remove();
            $("#jsonTip").empty();
            $("#textbox").val("");
            inputValue = "";
            getTotalNumber(defaultData);
            pageNumber = getpageNumber(defaultData);
            setPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
            parent.layer.msg('您已经将' +name + ' 成功添加', {icon: 1});
            parent.layer.close(index);
        }
    });
}

function deleteBookMark(id){
    //var id = $(this).attr("time");
    layer.confirm('确定要删除该书签吗？', {
        btn: ['准了','再想想'] //按钮
    }, function(){
        $.ajax({
            type: "post",
            url: "delete.jsp",
            data: {'time': id},
            //data: "command=12345", //+ name + "&address=" + url + "&command=add",
            success: function (data) {
                defaultData = JSON.parse(data);
                searchData = "";
                defaultgroup = groupBy(defaultData);
                $("#top").children("li:last-child").remove();
                $("#jsonTip").empty();
                $("#textbox").val("");
                inputValue = "";
                getTotalNumber(defaultData);
                pageNumber = getpageNumber(defaultData);
                setPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
                layer.msg('删除成功', {icon: 1});
            }
        });
    }, function(){
        //layer.msg('也可以这样', {
        //    time: 20000, //20s后自动关闭
        //    btn: ['明白了', '知道了']
        //});
    });
}

//$('.buttonDelete').click(function() {
//
//});

//
//;(function($) {
//    $(function() {
//
//
//
//    });
//})(jQuery);

