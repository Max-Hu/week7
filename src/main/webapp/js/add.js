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
        url: "add",
        data: {'title': name,'address':url},
        success: function (data) {
            defaultData = JSON.parse(data);
            searchData = "";
            defaultGroup = groupBy(defaultData);
            $("#top").children("li:last-child").remove();
            $("#jsonTip").empty();
            $("#textbox").val("");
            inputValue = "";
            getTotalNumber(defaultData);
            pageNumber = getPageNumber(defaultData);
            initPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
            parent.layer.msg('您已经将' +name + ' 成功添加', {icon: 1});
            parent.layer.close(index);
        }
    });
}