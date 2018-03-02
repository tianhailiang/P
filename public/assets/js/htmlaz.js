define(function (){
function getViewportSize() {
  if (window.innerHeight != null) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  if (document.compatMode == 'CSS1Compat') { //标准模式
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  };
}

function getElementOffset(element) {
  return {
    left: element.getBoundingClientRect().left,
    top: element.getBoundingClientRect().top
  };
}

function addHandler(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}

var data = {};
var uniqueId = 0;
var offsetBuffer = 50;

function bind() {
  addHandler(window, 'resize', excute);
  addHandler(window, 'scroll', excute);
}

function excute() {
  var viewport = getViewportSize();

  for (var i in data) {
    var item = data[i];
    var ele = item[0];
    var callback = item[1];
    if (!ele || !ele.getBoundingClientRect) {
      return;
    }
    //console.log('ele rect:',i,ele.getBoundingClientRect().left,ele.getBoundingClientRect().top);
    //console.log('ele offset:',i,getElementOffset(ele).left,getElementOffset(ele).top);

    if (getElementOffset(ele).top < viewport.height + offsetBuffer) {
      callback && callback();
      remove(i);
    }
  }
}

var addcnt = 0;
function add(element, callback) {
  data[uniqueId++] = [element, callback];
}

function remove(id) {
  try {
    delete data[id];
    return true;
  } catch (e) {
    //return false;
    throw new Error('Remove unknow lazy element by id:' + id);
  }
}

bind();

return {
  add: add,
  remove: remove
};
});