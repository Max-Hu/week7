function deleteBookMark(id){
    layer.confirm('确定要删除该书签吗？', {
        btn: ['准了','再想想'] //按钮
    }, function(){
        $.ajax({
            type: "post",
            url: "delete",
            data: {'time': id},
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
                setPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
                layer.msg('删除成功', {icon: 1});
            }
        });
    });
}