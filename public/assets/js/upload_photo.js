/**
 * Created by DXZ-Shuqin.Wang on 2017/10/18.
 */
function upload_photo_dialog (imgUrl) {
    console.log('upload_photo_dialog');
    var initFlag = $('#photoDialog').length;
    var photoDialog = null;
    if (initFlag) { //如果有了弹出框
        console.log('有');
    }
    else { //没有弹出框
        console.log('没有');
        photoDialog = $('<div id="photoDialog"></div>');
    }
}