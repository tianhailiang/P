
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
var edu_list = [{
  eduId: 1,
  eduName: '中学',
  country: [1,2,3,4,5,50,51,52,54,55,103,113]
}, {
  eduId: 2,
  eduName: '本科',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114]
}, {
  eduId: 3,
  eduName: '硕士',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114]
}, {
  eduId: 4,
  eduName: '博士',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114]
}]
var tag_list = [{
  tagId : 1,
  tagName: '留学初识',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 2,
  tagName: '本科选校',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2]
}, {
  tagId : 3,
  tagName: '硕士选校',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [3]
}, {
  tagId : 4,
  tagName: '留学打工',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 5,
  tagName: '本硕连读',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3]
}, {
  tagId : 6,
  tagName: '留学时间',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 7,
  tagName: '接机住宿',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 8,
  tagName: '艺术留学',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3,4]
}, {
  tagId : 9,
  tagName: 'QS排名',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3,4]
}, {
  tagId : 10,
  tagName: '留学费用',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 11,
  tagName: '大学排名',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3,4]
}, {
  tagId : 12,
  tagName: '留学条件',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 13,
  tagName: '留学案例',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 14,
  tagName: '专业解析',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3,4]
}, {
  tagId : 15,
  tagName: '签证指导',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 16,
  tagName: '就业指导',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2,3,4]
}, {
  tagId : 17,
  tagName: '申请规划',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 18,
  tagName: '行前指导',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 19,
  tagName: '省钱攻略',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 20,
  tagName: '文书准备',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 21,
  tagName: '海外生活',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 22,
  tagName: '院校资讯',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 23,
  tagName: '背景提升',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 24,
  tagName: '留学方案',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 25,
  tagName: '难点解析',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 26,
  tagName: '备考资讯',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 27,
  tagName: '院校百科',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 28,
  tagName: '动漫留学',
  country: [51],
  edu: [2,3,4]
}, {
  tagId : 29,
  tagName: '本科预科',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [2]
}, {
  tagId : 30,
  tagName: '硕士预科',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [3]
}, {
  tagId : 31,
  tagName: '留学考试',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}, {
  tagId : 32,
  tagName: '毕业回国',
  country: [1,2,3,4,5,50,51,52,54,55,100,101,102,103,
    104,105,106,107,108,109,110,111,112,113,114],
  edu: [1,2,3,4]
}]
function screenTag (country,...eduList) {
  //根据国家 学历参数筛选标签
  console.log('country ',country)
  console.log('eduList ',eduList)
  if (country == 0) {
    for (let item of tag_list) {
      console.log(item.tagName)
    }
  } else {
    for (let item of tag_list) {
      if(item.country.includes(country)) {
        // console.log('下一步循环')
        for (let eduId of eduList) {
          // console.log('eduId ',eduId)
          if (item.edu.includes(eduId)) {
            console.log(item.tagName)
            break;
          }
        }
      }
    }
  }
}
function screenEdu (country) {
  if (country == 0) {
    for (let item of edu_list) {
      console.log(item.eduName)
    }
  } else {
    for (let item of edu_list) {
      if (item.country.includes(country)) {
        console.log(item.eduName)
      }
    }
  }
}
// screenTag(1,1,2,3)
screenEdu(0)
screenEdu(100)