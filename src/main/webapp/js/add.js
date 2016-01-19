var url;
var name;
function addSubmit(){
    name = $("#bookMarkName").val();
    url = $("#bookMarkAddress").val();
    checkIllegalInput(name,url);
    $.ajax({
        type: "post",
        url: "add",
        data: {'title': name,'address':url},
        success: function (data) {
            defaultData = JSON.parse(data);
            $("#top").children("li:last-child").remove();
            cleanPage();
            setBookMarkData(defaultData);
            initPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
            parent.layer.msg('您已经将' +name + ' 成功添加', {icon: 1});
            parent.layer.close(index);
        }
    });
}

function checkIllegalInput(name,inputUrl){
    if(name == ""){
        $(".message").html("书签名不能为空!");
        return false;
    }else if(inputUrl == ""){
        $(".message").html("书签地址不能为空!");
        return false;
    }else {
        if (inputUrl.toLocaleLowerCase().indexOf("http://")!= 0){
            url = "http://" + inputUrl;
        }
    }
}