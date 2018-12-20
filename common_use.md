
## js

#### 判断undefied和空
orderId != "" && typeof(orderId) != "undefined"

#### 判断string能否转换成json对象
const tryParseJson = data => {
  if (typeof data == "string") {
    try{
      var obj = JSON.parse(data);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    }catch(e){
      return false;
    }
  }
}

#### 返回参数中带着callback需要截取并转换json对象的string
const parseJSON = data => {
  if (typeof data == "string") {
    data = data.replace(/callback\(/g, '');
    data = data.replace(/}]\)/g, '}]');
    data = data.replace(/}\)/g, '}');
    data = JSON.parse(data);
  }
  return data;
}

#### 升级版-若能则返回json对象，否则string
const tryParseJson = data => {
  if (typeof data == "string") {
    try{
      var obj = JSON.parse(data);
      if (typeof obj == 'object' && obj) {
        return obj;
      } else {
        return data;
      }
    }catch(e){
      return data;
    }
  }else{
    return null;
  }
}
