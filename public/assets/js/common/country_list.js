// var country_list = {
//   "1": {
//     edu_list: [{
//       eduId: 1,
//       eduName: '中学',
//       tag_list: [
//         {tagId: 1,tagName: '留学初识'},
//         {tagId: 4,tagName: '留学打工'},
//         {tagId: 6,tagName: '留学时间'},
//         {tagId: 7,tagName: '接机住宿'},
//         {tagId: 10,tagName: '留学费用'},
//         {tagId: 12,tagName: '留学条件'},
//         {tagId: 13,tagName: '留学案例'},
//         {tagId: 15,tagName: '签证指导'},
//         {tagId: 17,tagName: '申请规划'},
//         {tagId: 18,tagName: '行前指导'},
//         {tagId: 19,tagName: '省钱攻略'},
//         {tagId: 20,tagName: '文书准备'},
//         {tagId: 21,tagName: '海外生活'},
//         {tagId: 22,tagName: '院校资讯'},
//         {tagId: 23,tagName: '背景提升'},
//         {tagId: 24,tagName: '留学方案'},
//         {tagId: 25,tagName: '难点解析'},
//         {tagId: 26,tagName: '备考资讯'},
//         {tagId: 27,tagName: '院校百科'},
//         {tagId: 29,tagName: '本科预科'},
//         {tagId: 31,tagName: '留学考试'},
//         {tagId: 32,tagName: '毕业回国'}
//       ]
//     }, {
//       eduId: 2,
//       eduName: '本科',
//       tag_list: [
//         {tagId: 1,tagName: '留学初识'},
//         {tagId: 4,tagName: '留学打工'},
//         {tagId: 6,tagName: '留学时间'},
//         {tagId: 7,tagName: '接机住宿'},
//         {tagId: 10,tagName: '留学费用'},
//         {tagId: 12,tagName: '留学条件'},
//         {tagId: 13,tagName: '留学案例'},
//         {tagId: 15,tagName: '签证指导'},
//         {tagId: 17,tagName: '申请规划'},
//         {tagId: 18,tagName: '行前指导'},
//         {tagId: 19,tagName: '省钱攻略'},
//         {tagId: 20,tagName: '文书准备'},
//         {tagId: 21,tagName: '海外生活'},
//         {tagId: 22,tagName: '院校资讯'},
//         {tagId: 23,tagName: '背景提升'},
//         {tagId: 24,tagName: '留学方案'},
//         {tagId: 25,tagName: '难点解析'},
//         {tagId: 26,tagName: '备考资讯'},
//         {tagId: 27,tagName: '院校百科'},
//         {tagId: 29,tagName: '本科预科'},
//         {tagId: 31,tagName: '留学考试'},
//         {tagId: 32,tagName: '毕业回国'}
//       ]
//     }
//   ]}
  
// }
// {"countryId":"1","txt":"美国"},
        // {"countryId":"2","txt":"英国"},
        // {"countryId":"3","txt":"加拿大"},
        // {"countryId":"4","txt":"澳大利亚"},
        // {"countryId":"5","txt":"新西兰"},
        // {"countryId":"51","txt":"日本"},
        // {"countryId":"50","txt":"韩国"},
        // {"countryId":"54","txt":"中国香港"},
        // {"countryId":"55","txt":"中国澳门"},
        // {"countryId":"100","txt":"俄罗斯"},
        // {"countryId":"101","txt":"乌克兰"},
        // {"countryId":"108","txt":"爱尔兰"},
        // {"countryId":"111","txt":"意大利"},
        // {"countryId":"112","txt":"西班牙"},
        // {"countryId":"102","txt":"白俄罗斯"},
        // {"countryId":"52","txt":"新加坡"},
        // {"countryId":"53","txt":"马来西亚"},
        // {"countryId":"110","txt":"丹麦"},
        // {"countryId":"103","txt":"德国"},
        // {"countryId":"104","txt":"法国"},
        // {"countryId":"105","txt":"挪威"},
        // {"countryId":"106","txt":"瑞典"},
        // {"countryId":"107","txt":"芬兰"},
        // {"countryId":"109","txt":"荷兰"},
        // {"countryId":"113","txt":"瑞士"},
        // {"countryId":"114","txt":"奥地利"}
var tag_list = [{
  tagId : 1,
  tagName: '留学初识',
  country: [
    {id:1,name:'美国'},
    {id:2,name:'英国'},
    {id:3,name:'加拿大'},
    {id:4,name:'澳大利亚'},
    {id:5,name:'新西兰'},
    {id:50,name:'韩国'},
    {id:51,name:'日本'},
    {id:52,name:'新加坡'},
    {id:54,name:'中国香港'},
    {id:55,name:'中国澳门'},
    {id:100,name:'俄罗斯'},
    {id:101,name:'乌克兰'},
    {id:102,name:'白俄罗斯'},
    {id:103,name:'德国'},
    {id:104,name:'法国'},
    {id:105,name:'挪威'},
    {id:106,name:'瑞典'},
    {id:107,name:'芬兰'},
    {id:108,name:'爱尔兰'},
    {id:109,name:'荷兰'},
    {id:110,name:'丹麦'},
    {id:111,name:'意大利'},
    {id:112,name:'西班牙'},
    {id:113,name:'瑞士'},
    {id:114,name:'奥地利'}
  ],
  edu: [
    {id: 1, name: '中学'},
    {id: 2, name: '本科'},
    {id: 3, name: '硕士'},
    {id: 4, name: '博士'}
  ]
}]
function screenTag (country,...eduList) {
  console.log(country)
  console.log(eduList)
  for (let item of tag_list) {
    // console.log(item)
    for (let cItem of item.country) {
      // console.log(cItem)
      if (cItem.id == country || country == 0) {
        console.log('下一步循环')
        for (let eItem of item.edu) {
          console.log(eItem)
          for (let eduId of eduList) {
            console.log(eduId)
            if(eItem.id == eduId) {
              console.log('循环完成')
              break;
            }
          }
        }
      }
    }
  }
}

screenTag(1,1)