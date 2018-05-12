/**
 * Created by DXZ-Shuqin.Wang on 2017/9/5.
 */
/*根据url获取当前的筛选值，并标红*/
var getQueryString = function (name) {
    var reg;
    var search = window.location.search.substr(1);
    if(search.indexOf("?") != -1){
        reg = new RegExp("(^|&)" + name + "=([^]*)(&|$)");
    }else{
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    }
    var r = search.match(reg);
    if(r != null) return r[2];
    return null;
};

/*标红函数*/
var addFocusStatus = function (parentClass, selectName, dataType) {
    var lis = $(parentClass).children("li");
    var dataType = dataType ? dataType : 'id';
    $.each(lis, function (i, v) {
        var nowName = $(this).data(dataType);
        if (nowName == selectName) {
            $(this).find('a').addClass('focus-on');
        }
    })
};
/*分页器
 * total_num 总页数
 * cur_page 当前页码
 * */
var total_num = $('.pagination-box').data('pagenum');
var cur_page = Number(getQueryString("page") || 1);


/*if (cookie('currentarea')) {
    $('.current-city').html(iDcity1[cookie('currentarea')][0]);
}*/


