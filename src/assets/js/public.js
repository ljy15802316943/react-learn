// import emoji from '../../../static/emoji/emoji.json';
// import { DOMAIN } from './api';

const formatDate = function (date, fmts) {
  //时间戳转换成指定日期格式
  var fmt = "yyyy-MM-dd hh:mm:ss";
  if (fmts) {
    fmt = fmts;
  }
  date = new Date(date * 1000);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  // 时间不足两位，前面添加零。
  function padLeftZero(str) {
    return ("00" + str).substr(str.length);
  };
  return fmt;
}

// 回到顶部
const backTop = function() {
  let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
  let step = distance / 30; //每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step;
      window.scrollTo(0, distance);
      setTimeout(jump, 10);
    }
  })();
} 

// const forumEmoji = function(str) {
//   // 过滤表情包，添加img标签元素
//   if (!str) return;
//   emoji.emoticons.forEach((v,i) => {
//     str = str.replace(new RegExp('\\' + v.chs, "gm"), `<img src='${DOMAIN}/static/emoji/tt/${v.png}' class='emojiImg' />`)
//   });
//   return str;
// }

export default {
  formatDate,
  backTop,
  // forumEmoji
}