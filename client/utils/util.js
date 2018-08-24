// 一些公共方法
// 需要引入这个 js 才能使用这里的方法



const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 回到顶部
const toTop = n => {
  wx.pageScrollTo({
    scrollTop: 0,
    duration: 500
  });
}



module.exports = {
  formatTime: formatTime
  , toTop: toTop
}
