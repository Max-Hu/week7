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
                $("#top").children("li:last-child").remove();
                cleanPage();
                setBookMarkData(defaultData);
                initPage(document.getElementsByClassName("page") [0],pageNumber, 1 );
                layer.msg('删除成功', {icon: 1});
            }
        });
    });
}