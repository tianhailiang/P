
function login_info () {
    var info_uid = $('#info_uid').val() ? $('#info_uid').val() : 0;
    var info_username = $('#info_username').val();
    var info_nickname = $('#info_nickname').val();
    var info_realname = $('#info_realname').val();
    var info_phone = $('#info_phone').val();
    var info_usertype = $('#info_usertype').val();
    var info_adviser = $('#info_adviser').val();
    var info_status = $('#info_status').val();
    var info_version = $('#info_version').val();
    var info = {
      uid: info_uid,
      username: info_username,
      nickname: info_nickname,
      realname: info_realname,
      phone: info_phone,
      usertype: info_usertype,
      adviser: info_adviser,
      status: info_status,
      version: info_version
    }
    return info;
  }