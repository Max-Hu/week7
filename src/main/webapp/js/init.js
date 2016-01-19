var defaultData;
var pageLocation = 1;
var pageNumber;
var defaultGroup;
var inputValue;
var searchData;
var index;
$(function () {
    $.ajax({
        url: "init",
        data: {'command': 'init'},
        dataType: "json",
        async: false,
        success: function (data) {
            $("#jsonTip").empty();
            defaultData = data;
            defaultGroup = groupBy(defaultData);
            getTotalNumber(defaultData);
            pageNumber = getPageNumber(defaultData);
            initPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
        }
    });

    $("#textbox").on('input', function () {
        $("#top").children("li:last-child").remove();
        var value = $(this).val();
        inputValue = value;
        searchData = _.filter(defaultData, function (object) {
            return object["title"].toLowerCase().indexOf(value.toLowerCase()) != -1;
        });
        defaultGroup = groupBy(searchData);
        getTotalNumber(searchData);
        if (searchData.length != 0){
            pageNumber = getPageNumber(searchData);
        }else {
            pageNumber = 1;
        }
        initPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
    });

    $('#my-button').bind('click', function() {
        var html = "<p type='input'>书签名称: <input id='bookMarkName' type=\"text\" name=\"markName\" /></p>";
        html += "<p type='input'>书签地址: <input id='bookMarkAddress' type=\"text\" name=\"markAddress\" /></p>";
        html += "<div class='message'></div>";
        html += "<div><button type=\"submit\" class=\"button button-glow button-rounded button-raised button-primary\" id='add' onclick='addSubmit()'>确定</button></div>";
        index = layer.open({
            type: 1,
            area: ['450px', '260px'],
            moveType: 1,
            shadeClose: true,
            title: "添加书签",
            content: html,
        });
    });

});